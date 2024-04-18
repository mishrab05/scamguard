import pandas as pd
from sklearn.preprocessing import LabelEncoder
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics
from sklearn.model_selection import cross_val_score
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

##Enable CORS to allow  frontend to communicate with the backend
app = Flask(__name__)
CORS(app) 
##Download packages
nltk.download('punkt')
nltk.download('stopwords')
# Database connection settings
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

# Define a model that reflects your table structure
class Report(db.Model):
    __tablename__ = 'scam_messages'
    amount = db.Column(db.Integer, primary_key=True)
    num_reports = db.Column(db.String(255))
    fin_loss_reports = db.Column(db.String(255))

    def __repr__(self):
        return f'<Report amount={self.amount} num_reports={self.num_reports} fin_loss_reports={self.fin_loss_reports}>'


sms_text = pd.read_csv("spam.csv", encoding='latin-1')
sms_text.dropna(how="any", inplace=True, axis=1)
sms_text.columns = ['label', 'message']

#sms_text.head(5)

#sms_text.describe()

#sms_text.groupby('label').describe()

"""there are more ham messages than spam"""

#-----------------------Encoding labels-----------------------

le = LabelEncoder()
le.fit(sms_text['label'])

sms_text['label_encoded'] = le.transform(sms_text['label'])
sms_text.head()

sms_text['length_message'] = sms_text.message.apply(len)
#sms_text.head()

#sms_text[sms_text.label=='ham'].describe()

#sms_text[sms_text.label=='spam'].describe()

"""Spam messages have more characters"""

#-----------------------Text Preprocessing-----------------------

#-----------------------Remove punctuation and stop words and stemming-----------------------

def process_text(text):
    stemmer = PorterStemmer()
    #tokenize the text
    tokens = word_tokenize(text)
    #Convert to lower case and remove stop words
    STOPWORDS = set(stopwords.words('english'))
    stemmed_tokens = [stemmer.stem(word.lower()) for word in tokens 
                      if word.isalpha() and word.lower() not in STOPWORDS]
    return ' '.join(stemmed_tokens)

sms_text['cleaned_message'] = sms_text['message'].apply(process_text)

#sms_text['cleaned_message'].iloc[0]

#-----------------------Vectorisation-----------------------

#-----------------------CountVectoriser-----------------------

X = sms_text['cleaned_message']
y = sms_text['label_encoded']


#Train test split
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
print(len(X_train), len(y_train))
print(len(X_test), len(y_test))

# Instantiating the vectorizer
vect = CountVectorizer()
vect.fit(X_train)

X_train_dtm = vect.transform(X_train)
X_test_dtm = vect.transform(X_test)

#------------------------Machine Learning------------------------

# Initializing the Naive Bayes classifier
nb_classifier = MultinomialNB()

# Performing cross-validation
cv_scores = cross_val_score(nb_classifier, X_train_dtm, y_train, cv=5, scoring='accuracy')

print("Cross-validation scores (5-fold):", cv_scores)
print("Mean CV accuracy:", cv_scores.mean())

# Fitting the model to the entire training dataset
nb_classifier.fit(X_train_dtm, y_train)

# Evaluating test set
from sklearn.metrics import f1_score

y_pred = nb_classifier.predict(X_test_dtm)
test_f1_score = f1_score(y_test, y_pred, average='weighted')

print("Test set F1 score:", test_f1_score)

#-------------------------Dynamic input machine learning-------------------------
def predict_message_spam_or_ham(message):
    # Pre-process the user input
    cleaned_message = process_text(message)  
    
    # Vectorize the input using the same vectorizer
    message_vect = vect.transform([cleaned_message])
    
    # Predict using the trained model
    prediction = nb_classifier.predict(message_vect)
    
    # Return the prediction result
    return 'Not a spam message' if prediction[0] == 0 else 'spam'


#-------------------------Flask route to predict spam or not -------------------------
@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            #extract the message
            data = request.json
            message = data['text']
            #predict if the message is scam or not
            result = predict_message_spam_or_ham(message)
            #return the result
            return jsonify({'result': result})
        except Exception as e:
            return jsonify({'error': str(e)})

@app.route('/latest-report')
def latest_report():
    try:
        # Assuming you want the latest report; adjust as necessary.
        report = Report.query.order_by(Report.amount.desc()).first()
        if report:
            return jsonify({
                'amount': report.amount,
                'num_reports': report.num_reports,
                'fin_loss_reports': report.fin_loss_reports
            })
        else:
            return jsonify({'error': 'No reports found.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)

