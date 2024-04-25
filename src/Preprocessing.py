import pandas as pd
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
import re
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer, BertModel
from sklearn.model_selection import train_test_split


nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
bert = BertModel.from_pretrained('bert-base-uncased')

if torch.cuda.is_available():
    device = torch.device("cuda")
    print("Using CUDA:", torch.cuda.get_device_name(0))
else:
    device = torch.device("cpu")
    print("CUDA is not available, using CPU.")

#------------------------- Dataset -------------------------#
class TextDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_len=512):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = str(self.texts[idx])
        label = self.labels[idx]
        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_len,
            return_token_type_ids=False,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )

        return {
            'text': text,
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }
    
#------------------------- RNN Classifier -------------------------#
class RNNClassifier(nn.Module):
    def __init__(self, bert_model, hidden_dim, output_dim, n_layers, bidirectional, dropout):
        super(RNNClassifier, self).__init__()
        self.bert = bert_model
        embedding_dim = bert_model.config.to_dict()['hidden_size']
        self.rnn = nn.LSTM(
            input_size=embedding_dim,
            hidden_size=hidden_dim,
            num_layers=n_layers,
            bidirectional=bidirectional,
            dropout=dropout,
            batch_first=True
        )
        self.output = nn.Linear(hidden_dim * 2 if bidirectional else hidden_dim, output_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, input_ids, attention_mask):
        with torch.no_grad():
            embedded = self.bert(input_ids, attention_mask=attention_mask)[0]
        _, (hidden, _) = self.rnn(embedded)
        if self.rnn.bidirectional:
            hidden = self.dropout(torch.cat((hidden[-2,:,:], hidden[-1,:,:]), dim=1))
        else:
            hidden = self.dropout(hidden[-1,:,:])
        output = self.output(hidden)
        return output
#------------------------- Training and evaluating the model  -------------------------#
def train(model, criterion, optimizer, dataloader, device):
    model.train()
    total_loss = 0
    for batch in dataloader:
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)

        optimizer.zero_grad()
        outputs = model(input_ids, attention_mask)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    return total_loss / len(dataloader)

def evaluate(model, criterion, dataloader, device):
    model.eval()
    total_loss = 0
    total_correct = 0
    with torch.no_grad():
        for batch in dataloader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)

            outputs = model(input_ids, attention_mask)
            loss = criterion(outputs, labels)
            total_loss += loss.item()
            preds = torch.argmax(outputs, dim=1)
            total_correct += (preds == labels).sum().item()
    return total_loss / len(dataloader), total_correct / len(dataloader.dataset)

#------------------------- Text Preprocessing  -------------------------#
def clean_lemmatize_remove_stopwords(text):
    # Convert text to lowercase
    text = text.lower()
    
    # Remove special characters and punctuation using regex
    cleaned_text = re.sub(r'[^\w\s]', '', text)
    
    # Tokenize the cleaned text
    word_tokens = word_tokenize(cleaned_text)
    
    # Filter out the stopwords and lemmatize the remaining words
    filtered_lemmatized_text = [lemmatizer.lemmatize(word) for word in word_tokens if word not in stop_words]
    
    # Rejoin words into a string and return
    return ' '.join(filtered_lemmatized_text)
#------------------------- Data Loading and encoding -------------------------#

def load_dataset_one(filepath):
    """Load and preprocess the first dataset."""
    data = pd.read_csv(filepath, encoding='ISO-8859-1')
    # data.dropna(how="any", inplace=True, axis=1)
    columns_to_drop = [
    'URL Subcategory',
    'FullyQualifiedDomain',
    'Domain Registrar',
    'Domain Creation Date',
    'Domain Last Update',
    'timeReceived',
    'Subdomain',
    'RedirectedURL',
    'Url',
    'Fulltext','messageid','Sender','SenderType','Domain','TLD','Brand','Message Categories']
    data.drop(columns_to_drop, axis=1, inplace=True,errors="ignore")  
  
    data['label'] = (data['Phishing'] > 0) | (data['Suspicious'] > 0) | (data['Malware'] > 0)
   
    columns_to_drop2 =['Phishing','Suspicious','Malware','Detected','Malicious']
    data.drop(columns_to_drop2, axis=1, inplace=True,errors="ignore")
    data.dropna(how="any", inplace=True, axis=0)
    print(data.columns)
    data['MainText'] = data['MainText'].apply(clean_lemmatize_remove_stopwords)

    return data

def load_dataset_two(filepath):
    content = pd.read_csv(filepath, encoding='latin-1')
    content.drop(['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4'],axis=1,inplace=True)
    content.dropna(how = "any", inplace=True, axis=0)
    content.columns = ['label', 'message']
    content['message'] = content['message'].apply(clean_lemmatize_remove_stopwords)
    return content

def label_encode(dataset,col):
    le = LabelEncoder()
    dataset['label'] = le.fit_transform(dataset[col])
    return dataset

#------------------------- Main function  -------------------------#


def main():
    # Load both datasets
    data_one = load_dataset_one('analysisdataset.csv')
    data_two = load_dataset_two('spam.csv')

    encoded_datasetone = label_encode(data_one, 'label')
    encoded_datasettwo = label_encode(data_two, 'label')

    encoded_datasetone.rename(columns={'MainText': 'sms'}, inplace=True)
    encoded_datasettwo.rename(columns={'message': 'sms'}, inplace=True)

    # Combine or use the datasets as needed
    combined_data = pd.concat([encoded_datasetone, encoded_datasettwo], ignore_index=True)
    model = RNNClassifier(bert, hidden_dim=256, output_dim=2, n_layers=2, bidirectional=True, dropout=0.1)
    model = model.to(device)
    #criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

  
    # Extract features and target
    texts = combined_data['sms'].tolist()
    labels = combined_data['label'].tolist()

    # Split data into training and test sets
    train_texts, test_texts, train_labels, test_labels = train_test_split(
        texts, labels, test_size=0.30, random_state=42)
    # Create Dataset objects
    train_dataset = TextDataset(train_texts, train_labels, tokenizer)
    test_dataset = TextDataset(test_texts, test_labels, tokenizer)

    # Create Data Loaders
    batch_size = 16
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
    # Parameters
    epochs = 4
    criterion = nn.CrossEntropyLoss().to(device)

    for epoch in range(epochs):
        train_loss = train(model, criterion, optimizer, train_loader, device)
        test_loss, test_accuracy = evaluate(model, criterion, test_loader, device)
        print(f'Epoch {epoch+1}, Train Loss: {train_loss:.4f}, Test Loss: {test_loss:.4f}, Test Accuracy: {test_accuracy:.2f}')
    torch.save(model.state_dict(), 'model_state_dict.pth')

if __name__ == '__main__':
    main()