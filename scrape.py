import pandas as pd
from bs4 import BeautifulSoup as bs
from requests import get
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from Postgres_Login import username, password, database

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
engine = create_engine(f"postgresql://{username}:{password}@localhost:5432/{database}")
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

    if dataLink != '.gitignore' and dataLink != 'README.md' and dataLink != '03-22-2020.csv' and dataLink != '03-23-2020.csv' and dataLink != '03-24-2020.csv' and dataLink != '03-25-2020.csv' and dataLink != '03-26-2020.csv' and dataLink != '03-27-2020.csv' and dataLink != '03-28-2020.csv' and dataLink != '03-29-2020.csv' and dataLink != '03-30-2020.csv' and dataLink != '03-31-2020.csv' and dataLink != '04-01-2020.csv' and dataLink != '04-02-2020.csv' and dataLink != '04-03-2020.csv' and dataLink != '04-04-2020.csv' and dataLink != '04-05-2020.csv' and dataLink != '04-06-2020.csv' and dataLink != '04-07-2020.csv' and dataLink != '04-08-2020.csv' and dataLink != '04-09-2020.csv' and dataLink != '04-10-2020.csv' and dataLink != '04-11-2020.csv':
        rawDataLink = rawLink + dataLink
        dataFrame = pd.read_csv(rawDataLink, index_col=0)
        my_list = dataFrame.columns.values.tolist()

        if 'Admin2' in my_list:
                        
            dataFrameCleaned = dataFrame[[                          'Admin2', 'Province_State', 'Lat', 'Long_', 'Confirmed', 'Deaths',
                                                                    'Recovered', 'Active', 'Combined_Key']]

            dataFrameCleaned = dataFrameCleaned.rename(columns={    'Admin2': 'city',
                                                                    'Province_State': 'state',
                                                                    'Lat': 'latitude',
                                                                    'Long_': 'longitude',
                                                                    'Confirmed': 'confirmed',
                                                                    'Deaths': 'deaths',
                                                                    'Recovered': 'recovered',
                                                                    'Active': 'active',
                                                                    'Combined_Key': 'location'})

            dataFrameCleaned = dataFrameCleaned.dropna()

            dfList.append(dataFrameCleaned)
            title = dataLink.replace('.csv', '')
            title = title.replace("-", "_")

            if title.startswith("01"):
                title = title.replace("01", "january", 1)
            elif title.startswith("02"):
                title = title.replace("02", "febraury", 1)
            elif title.startswith("03"):
                title = title.replace("03", "march", 1)
            elif title.startswith("04"):
                title = title.replace("04", "april", 1)
            elif title.startswith("05"):
                title = title.replace("05", "may", 1)
            elif title.startswith("06"):
                title = title.replace("06", "june", 1)
            elif title.startswith("07"):
                title = title.replace("07", "july", 1)
            elif title.startswith("08"):
                title = title.replace("08", "august", 1)
            elif title.startswith("09"):
                title = title.replace("09", "september", 1)
            elif title.startswith("10"):
                title = title.replace("10", "october", 1)
            elif title.startswith("11"):
                title = title.replace("11", "november", 1)
            elif title.startswith("12"):
                title = title.replace("12", "december", 1)

            dataFrameCleaned.to_sql(name = title, con = engine, if_exists = "append", index = False)
            
    return dfList

scraper()