from bs4 import BeautifulSoup as bs
from requests import get
import pandas as pd
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
username = "postgres"
password = "postgres"
postgreslog = f"{username}:{password}@localhost:5432/covid_cases"
engine = create_engine(f"postgresql://{postgreslog}")
app.config['SQLALCHEMY_DATABASE_URI'] = engine
db = SQLAlchemy(app)

def scraper():
    url = "https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports"
    response = get(url)
    soup = bs(response.text, "html.parser")
    rawLink = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'
    dfList = []

    for fileLink in soup.findAll("a", class_="js-navigation-open link-gray-dark"):
        dataLink = fileLink.get('title')
        dfList = dataFrameCleaner(dataLink, rawLink, dfList)

    return dfList

def dataFrameCleaner(dataLink, rawLink, dfList):

    if dataLink != '.gitignore' and dataLink != 'README.md':
        rawDataLink = rawLink + dataLink
        dataFrame = pd.read_csv(rawDataLink, index_col=0)
        my_list = dataFrame.columns.values.tolist()

        if 'Admin2' in my_list:
                        
            dataFrameCleaned = dataFrame[[                          'Admin2', 'Province_State', 'Lat', 'Long_', 'Confirmed', 'Deaths',
                                                                    'Recovered', 'Active', 'Combined_Key']]
            
            dataFrameCleaned = dataFrameCleaned.rename(columns={    'Admin2': 'City',
                                                                    'Province_State': 'State',
                                                                    'Lat': 'Latitude',
                                                                    'Long_': 'Longitude',
                                                                    'Combined_Key': 'Location'})

            dfList.append(dataFrameCleaned)
            title = dataLink.replace('.csv', '')
            dataFrameCleaned.to_sql(name = title, con = engine, if_exists = "append", index = False)
            
    return dfList