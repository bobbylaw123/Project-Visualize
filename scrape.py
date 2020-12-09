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

            dataFrameCleaned = dataFrameCleaned.dropna(subset = ["City"])

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