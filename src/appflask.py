from flask import Flask, request, jsonify
from flask_cors import CORS
from main import process_text, predict_message_spam_or_ham,vect,nb_classifier

app = Flask(__name__)
CORS(app)  # Enable CORS to allow your frontend to communicate with this backend


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

if __name__ == '__main__':
    app.run(debug=True)
