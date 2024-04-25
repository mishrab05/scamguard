import pandas as pd


def load_dataset_two(filepath):
    content = pd.read_csv(filepath, encoding='latin-1')
    content.drop(['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4'],axis=1,inplace=True)
    content.dropna(how = "any", inplace=True, axis=0)
    content.columns = ['label', 'message']
    #content['message'] = content['message'].apply(clean_lemmatize_remove_stopwords)
    return content

load_dataset_two('spam.csv')

