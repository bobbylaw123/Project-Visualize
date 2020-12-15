import json
# import scrape
# import scrapeLatest
import psycopg2
from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from Postgres_Login import username, password, database

# Flask startup
app = Flask(__name__)

# PostgreSQL connect
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

# All the names of the tables to be listed in the drop down menu.
@app.route('/table_names')
def table_names():
    name = engine.execute("""   SELECT table_name FROM information_schema.tables
                                WHERE table_schema='public'""").fetchall()

    print (name)
    return json.dumps([dict(r) for r in name])

# Pulls data from the requested date on the drop down menu to json string.
@app.route('/bar')
def bar():
    
    # The drop down menu's requested date input
    requested_date = request.args.get('requested_date')
    results = engine.execute(f"""   select state, sum(deaths), sum(confirmed)
                                    from {requested_date} group by state
                                    order by state""").fetchall()
    states_list = []
    deaths_list = []
    recovered_list = []
    confirmed_list = []

    for state, deaths, confirmed in results:

        recovered = (int(confirmed)-int(deaths))
        
        states_list.append(state)
        deaths_list.append(int(deaths))
        recovered_list.append(int(recovered))
        confirmed_list.append(int(confirmed))

    results_dic = {"state": states_list, "deaths": deaths_list,
                    "recovered": recovered_list, "confirmed": confirmed_list}

    print(results_dic)
    return jsonify(results_dic)

# Sending info from jsonify data pulled from previous route into bar.html to form bar chart.
@app.route('/bars')
def bars():
    return render_template("bar.html")

@app.route('/line')
def line():
    # change december_09_2020 to latest_data in production
    results = engine.execute(f"""select state, sum(deaths), sum(confirmed)
    from december_09_2020 group by state
    order by state""").fetchall()

    states_list = []
    deaths_list = []
    recovered_list = []
    confirmed_list = []
    for state, deaths, confirmed in results:
        recovered = (int(confirmed)-int(deaths))
        states_list.append(state)
        deaths_list.append(int(deaths))
        recovered_list.append(int(recovered))
        confirmed_list.append(int(confirmed))
    results_dic = {"state": states_list, "deaths": deaths_list,
               "recovered": recovered_list, "confirmed": confirmed_list}
    print(results_dic)
    return jsonify(results_dic)

@app.route('/linepg')
def linepg():
    return render_template("line.html")
        
if __name__ == "__main__":
    app.run(debug=True)
