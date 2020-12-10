var trace1 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [20, 14, 23],
    name: 'Deaths',
    type: 'bar'
  };
  
  var trace2 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [12, 18, 29],
    name: 'Recovered',
    type: 'bar'
  };
  
  var trace2 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [12, 18, 29],
    name: 'Active',
    type: 'bar'
  };

  var data = [trace1, trace2, trace3];
  
  var layout = {barmode: 'stack'};
  
  Plotly.newPlot('myDiv', data, layout);