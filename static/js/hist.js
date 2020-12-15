
function createChart(requested_date) {
  d3.json(`/hist?requested_date=${requested_date}`).then(response => {

    var deaths = response.deaths;
    var recovered = response.recovered;
    var confirmed = response.confirmed;

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

var dropdownMenu = document.getElementById("dropdown");
dropdownMenu.addEventListener("change", (event)=>{

    // Reading the json str with new data to be updated in bar graph.
    d3.json(`/hist?requested_date=${event.target.value}`).then(response => {
          var deaths = response.deaths;
    var recovered = response.recovered;
    var confirmed = response.confirmed;

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
});

init();