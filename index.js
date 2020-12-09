const Client = require('pg').Client
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "covid_cases"
})

client.connect()
.then(() => console.log("Connected Successfully"))
.then(() => client.query("select * from december_05_2020"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())
