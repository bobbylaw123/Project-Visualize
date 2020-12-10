from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import scrapeLatest
from Postgres_Login import username, password, database

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
engine = create_engine(f"postgresql://{username}:{password}@localhost:5432/{database}")
app.config['SQLALCHEMY_DATABASE_URI'] = engine
db = SQLAlchemy(app)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/about')
def about():
    names = ["Jeff Chow", "Abhijit Purru", "Elise Eng"]
    return render_template("about.html", names = names)