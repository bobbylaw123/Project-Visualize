d3.json("/plot").then((response) => {

  console.log(response);

  var deaths = 0;
  var recovered = 0;
  var active = 0;

  response.forEach(element => {
    deaths = parseInt(element.Deaths) + deaths;
    recovered = parseInt(element.Recovered) + recovered;
    active = parseInt(element.Active) + active;
  });

  console.log(deaths);
  console.log(recovered);
  console.log(active);

  var data = [{
    values: [deaths, recovered, active],
    labels: ['Deaths', 'Recovered', 'Active'],
    type: 'pie'
  }];
  
  var layout = {
    title: 'COVID-19 US Daily Cases',
    height: 400,
    width: 500
  };
  
  Plotly.newPlot('plot', data, layout);
});