import pandas as pd
import psycopg2
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

conn = psycopg2.connect(database=database, user=username, password=password)
conn.autocommit = True
cursor = conn.cursor()

url = "https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports"
response = get(url)
soup = bs(response.text, "html.parser")
rawLink = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'

for fileLink in soup.findAll("a", class_="js-navigation-open link-gray-dark"):
    dataLink = fileLink.get('title')

    if not dataLink == 'README.md':
        latest_csv = dataLink

rawDataLink = rawLink + latest_csv

dataFrame = pd.read_csv(rawDataLink, index_col=0)

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

cursor.execute(f"DROP table IF EXISTS latest_data")
conn.commit()
conn.close()

dataFrameCleaned.to_sql(name = "latest_data", con = engine, if_exists = "append", index = False)