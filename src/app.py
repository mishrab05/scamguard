from flask import Flask, request, jsonify
import torch
import nltk
from transformers import BertTokenizer, BertModel
import torch.nn as nn
import re
import pyodbc
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from Preprocessing import RNNClassifier
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import desc

# Define the Flask app
app = Flask(__name__)
CORS(app)
# Load BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
bert_model = BertModel.from_pretrained('bert-base-uncased')
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
# Load the trained RNN classifier
rnn_model = RNNClassifier(bert_model,hidden_dim=256, output_dim=2, n_layers=2, bidirectional=True, dropout=0.1)
rnn_model.load_state_dict(torch.load('model_state_dict.pth'))
rnn_model.eval()

params = (
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=5120main.database.windows.net;"
    "PORT=1433;"
    "DATABASE=5120main;"
    "UID=user;"
    "PWD=Fit51205120"
)

# URI format for SQL Alchemy (URL encode the parameters)
DATABASE_URI = f'mssql+pyodbc:///?odbc_connect={params}'

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
#Display Scores
class Score(db.Model):
    __tablename__ = 'Score'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Score {self.username} {self.score}>'

# Preprocessing function
def preprocess_text(text):
    # Example preprocessing as done during training
    text = text.lower()
    cleaned_text = re.sub(r'[^a-z0-9\s]', '', text)
    word_tokens = word_tokenize(cleaned_text)
    filtered_text = [lemmatizer.lemmatize(word) for word in word_tokens if word not in stop_words]
    return ' '.join(filtered_text)

# Prediction function
def predict(text):
    # Preprocess text
    preprocessed_text = preprocess_text(text)
    
    # Convert text to BERT embeddings
    inputs = tokenizer.encode_plus(
        preprocessed_text, 
        None, 
        add_special_tokens=True, 
        max_length=512, 
        padding='max_length', 
        return_token_type_ids=False, 
        return_attention_mask=True, 
        truncation=True,
        return_tensors='pt'
    )
    
    input_ids = inputs['input_ids']
    attention_mask = inputs['attention_mask']
    
    # Predict with the RNN model
    with torch.no_grad():
        outputs = rnn_model(input_ids, attention_mask)
        prediction = torch.argmax(outputs, dim=1).cpu().numpy()[0]
    
    return 'It is a Scam' if prediction == 1 else 'It is not a Scam'

# Define API route
@app.route('/predict', methods=['POST'])
def handle_predict():
    data = request.get_json()
    text = data['text']
    result = predict(text)
    return jsonify({'result': result})
#define API for submitting score
@app.route('/score-submit', methods=['POST'])
def score_submit():
    data = request.get_json()
    new_score = Score(username=data['username'], score=data['score'])
    db.session.add(new_score)
    db.session.flush()  # This allows us to use the id of the new_score object before commit

    # Commit the session after flush to save the score
    db.session.commit()

    # Get the top five scores
    top_five_scores = Score.query.order_by(Score.score.desc()).limit(5).all()

    # Calculate the percentile rank
    count_higher_scores = Score.query.filter(Score.score > data['score']).count()
    count_all_scores = Score.query.count()
    percentile_rank = (count_all_scores - count_higher_scores) / count_all_scores * 100

    top_scores = [{'username': score.username, 'score': score.score} for score in top_five_scores]

    return jsonify({
        'new_score_id': new_score.id,
        'top_scores': top_scores,
        'percentile_rank': percentile_rank
    }), 201

#define API for leaderboard
@app.route('/leaderboard_top5', methods=['GET'])
def get_top_scores():
    top_five_scores = Score.query.order_by(desc(Score.score)).limit(5).all()
    results = [{'username': score.username, 'score': score.score} for score in top_five_scores]
    return jsonify(results)

# Run the Flask application
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
