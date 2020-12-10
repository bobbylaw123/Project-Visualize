from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import scrape

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
username = "postgres"
password = "postgres"
postgreslog = f"{username}:{password}@localhost:5432/covid_cases"
engine = create_engine(f"postgresql://{postgreslog}")
app.config['SQLALCHEMY_DATABASE_URI'] = engine
db = SQLAlchemy(app)

@app.route('/')
def test():
    dfList = scrape.scraper()
    for data in dfList:
        dfList[data].to_sql(name=data, con=engine, if_exists="append", index=False)
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
