d3.json("/hist").then((response) => {

  console.log(response);

  var deaths = response.deaths;
  var recovered = response.recovered;
  var confirmed = response.confirmed;

  console.log(deaths);
  console.log(recovered);
  console.log(confirmed);
  
  var trace1 = {
    x: confirmed,
    type: "histogram",
    opacity: 0.5,
    name: "Confirmed",
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
    name: "Recovered",
    marker: {
       color: 'blue',
    },
  };

  var data = [trace2, trace3, trace1];

  var layout = {
    title: 'Histogram of COVID-19 US Daily Cases',
    xaxis: {title: "Value"}, 
    yaxis: {title: "Cases Count"},
    height: 800,
    width: 900,
    barmode: "stack"
  };
  
  Plotly.newPlot('hist', data, layout);
});