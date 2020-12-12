// Creates the bar graph.
function createChart(requested_date) {
  d3.json(`/bar?requested_date=${requested_date}`).then(response => {
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
      title: 'Latest Update On Total number of Active Cases, Deaths and Recoveries',
      titlefont: {
        size:30,
        color: 'rgb(107, 107, 107)'
      },
      xaxis: {
        title: 'US States',
        titlefont: {
          size:23,
          color: 'rgb(107, 107, 107)'
        },
        tickfont: {
          size: 10,
          color: 'rgb(107, 107, 107)'
        }
      },
      yaxis: {
        title: 'Total Cases by Active, Deaths and Recoveries',
        titlefont: {
          size: 13,
          color: 'rgb(107, 107, 107)'
        },
        tickfont: {
          size: 13,
          color: 'rgb(107, 107, 107)'
        }
      },
      barmode: 'stack'
    };
  
    Plotly.newPlot('bar', data, layout);

  })
}

// Initial Page showing the latest data.
function init() {
  d3.json("/table_names").then((response) => {
    console.log(response)
    // Drop down menu set up by appending every table_name into said menu.
    var dropdownMenu = document.getElementById("dropdown")
    for (let i = 0; i < response.length; i++){
        let newOption = document.createElement("option")
        newOption.innerHTML = response[i].table_name
            dropdownMenu.appendChild(newOption)
        }
    })
  createChart('latest_data')
}

// Sent to /bar to form a json str.
// Response to a requested date that was selected from drop down menu.
var dropdownMenu = document.getElementById("dropdown")
dropdownMenu.addEventListener("change", (event)=>{

    // Reading the json str with new data to be updated in bar graph. 
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
          title: 'Update On Total number of Active Cases, Deaths and Recoveries by Requested Date',
          titlefont: {
            size:30,
            color: 'rgb(107, 107, 107)'
          },
          xaxis: {
            title: 'US States',
            titlefont: {
              size:23,
              color: 'rgb(107, 107, 107)'
            },
            tickfont: {
              size: 10,
              color: 'rgb(107, 107, 107)'
            }
          },
          yaxis: {
            title: 'Total Cases by Active, Deaths and Recoveries',
            titlefont: {
              size: 13,
              color: 'rgb(107, 107, 107)'
            },
            tickfont: {
              size: 13,
              color: 'rgb(107, 107, 107)'
            }
          },
          barmode: 'stack'
        };
      
        Plotly.newPlot('bar', data, layout);
    })
})

init()