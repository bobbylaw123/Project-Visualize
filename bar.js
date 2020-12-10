d3.json("/bar").then((response) => {

  console.log(response);

  var deaths = response.deaths;
  var recovered = response.recovered;
  var active = response.active;

  console.log(deaths);
  console.log(recovered);
  console.log(active);

  var trace1 = {
    x: response.state,
    y: deaths,
    name: 'Deaths',
    type: 'bar'
  };

  var trace2 = {
    x: response.state,
    y: recovered,
    name: 'Recovered',
    type: 'bar'
  };

  var trace3 = {
    x: response.state,
    y: active,
    name: 'Active',
    type: 'bar'
  };

  var data = [trace1, trace2, trace3];

  var layout = {
    title: 'Daily New Cases/Deaths/Recoveries on Selected Day',
    xaxis: {
      title: 'US States',
      tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      }
    },
    yaxis: {
      title: 'cases',
      titlefont: {
        size: 16,
        color: 'rgb(107, 107, 107)'
      },
      tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      }
    },
    barmode: 'stack'
  };

  Plotly.newPlot('bar', data, layout);
});