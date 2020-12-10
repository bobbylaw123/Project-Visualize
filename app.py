from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import scrape
from loginInfo import username, password

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
engine = create_engine(f"postgresql://{username}:{password}@localhost:5432/covid_cases")
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
