d3.json("/table_names").then((response) => {

  console.log(response)

  var dropdownMenu = document.getElementById("dropdown")
  for (let i = 0; i < response.length; i++){
      let newOption = document.createElement("option")
      newOption.innerHTML = response[i].table_name
          dropdownMenu.appendChild(newOption)
      }
      
  dropdownMenu.addEventListener("change", event => {
      d3.json(`/bar?requested_date=${event.target.value}`).then(response => {
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
            title: 'Covid Cases on Active Cases, Deaths and Recoveries by Day',
            titlefont: {
              size:40,
              color: 'rgb(107, 107, 107)'
            },
            xaxis: {
              title: 'US States',
              titlefont: {
                size:30,
                color: 'rgb(107, 107, 107)'
              },
              tickfont: {
                size: 13,
                color: 'rgb(107, 107, 107)'
              }
            },
            yaxis: {
              title: 'Cases by Active, Deaths and Recoveries',
              titlefont: {
                size: 30,
                color: 'rgb(107, 107, 107)'
              },
              tickfont: {
                size: 15,
                color: 'rgb(107, 107, 107)'
              }
            },
            barmode: 'stack'
          };
        
          Plotly.newPlot('bar', data, layout);
      })
  })
})