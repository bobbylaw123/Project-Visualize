d3.json("/pie").then((response) => {

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
        type: 'pie'
    };

    var trace2 = {
        x: response.state,
        y: recovered,
        name: 'Recovered',
        type: 'pie'
    };

    var trace3 = {
        x: response.state,
        y: active,
        name: 'Active',
        type: 'pie'
    };

    var data = [trace1, trace2, trace3];

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

    Plotly.newPlot('piepg', data, layout);
});