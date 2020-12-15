d3.json("/hist").then((response) => {

  var deaths = response.deaths;
  var recovered = response.recovered;
  var confirmed = response.confirmed;

  var trace1 = {
    x: confirmed,
    type: "histogram",
    opacity: 0.5,
    name: "Total",
    marker: {
       color: 'green',
    },
  };
  var trace2 = {
    x: deaths,
    type: "histogram",
    opacity: 0.8,
    name: "Deaths",
    marker: {
       color: 'red',
    },
  };

  var trace3 = {
    x: recovered,
    type: "histogram",
    opacity: 0.6,
    name: "Affected",
    marker: {
       color: 'blue',
    },
  };

  var data = [trace2, trace3, trace1];

  var layout = {
    title: 'Total of COVID-19 US Cases by State',
    xaxis: {title: "Number of Cases AKA Per Person With Covid-19"},
    yaxis: {title: "Cases Per State"},
    height: 800,
    width: 900,
    barmode: "stack"
  };

  Plotly.newPlot('hist', data, layout);
});