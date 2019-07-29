import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import preprocessing as ppr
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_squared_error
import math
from sklearn.metrics import roc_curve, roc_auc_score, auc, accuracy_score, confusion_matrix, classification_report
#import seaborn as sns

from warnings import simplefilter, filterwarnings
from sklearn.exceptions import DataConversionWarning
filterwarnings(action='ignore', category=DataConversionWarning)
simplefilter(action='ignore', category=FutureWarning)

def plot_roc_curve(fpr, tpr):
    """
    Plots the AUC-ROC Curve as an evaluation metric
    
    Parameters:
    fpr (array)
    tpr (array)
    
    """
    plt.plot(fpr, tpr, color='orange', label='ROC')
    plt.plot([0, 1], [0, 1], color='darkblue', linestyle='--')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Receiver Operating Characteristic (ROC) Curve')
    plt.legend()
    plt.show()

def plotBinary(data):
    '''
    Plots the binary relation between all properties.
    
    Parameters:
    data (pd.DataFrame)
    '''
    sns.pairplot(data)

def dataScaling(df):
    '''
    Scales the data using a StandardScaler().
    
    Parameters:
    df (pd.DataFrame)
    '''
    
#    scaler = ppr.RobustScaler()
    scaler = ppr.StandardScaler()
    scaled_data = pd.DataFrame()
    scaled_data['id'] = df['id']
    temp = df.loan_amnt.values.reshape(-1, 1)
    
    scaled = scaler.fit_transform(temp)
    scaled_data['loan_amnt_scaled'] = scaled.flatten()
    
    temp = df.annual_inc.values.reshape(-1, 1)
#    min_max_scaler = ppr.MinMaxScaler()
    scaled = scaler.fit_transform(temp)
    scaled_data['annual_inc_scaled'] = scaled.flatten()
    
    temp = df.delinq_2yrs.values.reshape(-1, 1) 
#    min_max_scaler = ppr.MinMaxScaler()
    scaled = scaler.fit_transform(temp)
    scaled_data['delinq_2yrs_scaled'] = scaled.flatten()
    
    temp = df.emp_length.values.reshape(-1, 1)
#    min_max_scaler = ppr.MinMaxScaler()
    scaled = scaler.fit_transform(temp)
    scaled_data['emp_length'] = scaled.flatten()
    
    temp = df.total_acc.values.reshape(-1, 1)
#    min_max_scaler = ppr.MinMaxScaler()
    scaled = scaler.fit_transform(temp)
    scaled_data['total_acc'] = scaled.flatten()
    
    scaled_data[list(one_hot)] = df[list(one_hot)]
    
    temp = df.revol_util.values.reshape(-1,1)
    scaled = scaler.fit_transform(temp)
    scaled_data['revol_util'] = scaled.flatten()
    
    temp = df.revol_bal.values.reshape(-1,1)
    scaled = scaler.fit_transform(temp)
    scaled_data['revol_bal'] = scaled.flatten()

    temp = df.mths_since_last_delinq.values.reshape(-1,1)
    scaled = scaler.fit_transform(temp)
    scaled_data['mths_since_last_delinq'] = scaled.flatten()
    
    temp = df.mths_since_last_record.values.reshape(-1,1)
    scaled= scaler.fit_transform(temp)
    scaled_data['mths_since_last_record'] = scaled.flatten()
    
    temp = df.open_acc.values.reshape(-1,1)
    scaled= scaler.fit_transform(temp)
    scaled_data['open_acc'] = scaled.flatten()
    
    return scaled_data

n_param = 24
data = pd.read_csv('C:/Users/YashGandhe/Coding/Project/Project/Modelingdataset.csv')
one_hot = pd.get_dummies(data['purpose'])
data = data.join(one_hot)
data.replace(['Fully Paid', 'Current','In Grace Period', 'Late (16-30 days)', 'Late (31-120 days)', 'Default','Charged Off' ], 
                         [1, 1, 1, 0, 0, 0, 0], inplace=True)
#plotBinary(data)
y = data.loan_status
x = data.drop(['loan_status', 'pub_rec', 'desc'], axis=1)

# Split Data into training and test
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=7)
data.drop_duplicates(inplace=True)


# Train data reshaping

scaled_data = pd.DataFrame()
scaled_data = dataScaling(x_train)
scaled_data_test = pd.DataFrame()
scaled_data_test = dataScaling(x_test)

def sigmoid(x):
  return 1 / (1 + math.exp(-x)) 

def LogisticReg(scaled_data, y_train, scaled_data_test):
    logist_reg = LogisticRegression()
    
    logist_reg.fit(scaled_data, y_train)
    coeff = logist_reg.coef_
    coeff = coeff[0]
    inter = logist_reg.intercept_
    inter  = inter[0]
    coeff = coeff.reshape(n_param, 1)
    prod = np.dot(scaled_data_test, coeff) + inter
    sigmoid_v = np.vectorize(sigmoid)
    return sigmoid_v(prod), coeff, inter

prod, coeff, inter = LogisticReg(scaled_data.iloc[:,1:], y_train, scaled_data_test.iloc[:,1:])
print("Coeff:", coeff)
print("Inter:", inter)

min_max_scaler = ppr.MinMaxScaler(feature_range=(0,1))
scaled = min_max_scaler.fit_transform(prod).flatten()

threshold = 0.6
scaled[scaled<=threshold] = 0

scaled[scaled > threshold] = 1
print(scaled)
print("RMSE: ", mean_squared_error(y_test, scaled))

auc = roc_auc_score(y_test, scaled)
fpr, tpr, thresholds = roc_curve(y_test, scaled)

print(classification_report(y_test, scaled))

print(confusion_matrix(y_test, scaled))

print(accuracy_score(y_test, scaled))