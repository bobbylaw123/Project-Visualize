d3.json("/line").then((response) => {

    console.log(response);

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var deaths = response.deaths;
    var recovered = response.recovered;
    var confirmed = response.confirmed;
    var statelist = response.state;

    console.log(deaths);
    console.log(recovered);
    console.log(confirmed);   
    console.log(statelist);

    // append the svg object to the body of the page
    var svg = d3.select("#line")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the options to the button
    //    d3.select("#stateButton")
    //    .selectAll('myOptions')
    //    .data(statelist)
    //    .enter()
    //    .append('option')
    //    .text(function (d) { return d; }) 
    //    .attr("value", function (d) { return d; });

    // Add y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(confirmed)])
        .range([ height, 0 ]);
        svg.append("g")
        .call(d3.axisLeft(y));
    
        // Add x axis
    var x = d3.scaleLinear()
        .domain([d3.extent(data, function(d) {return d.state; })])
        .range([0, width ]);
        svg.append("g")
        .attr('class', 'xaxis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(7));

    // text label for the y axis
    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Confirmed coronavirus cases");

    // text label for the x axis
    svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("US States");

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    var brush = d3.brushX()
        .extent([[0, 0], [width, height]])
        .on("end", updateChart);

    var line = svg.append('g')
        .attr("clip-path", "url(#clip)")
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.value)})
        x.domain(d3.extent(data, function(d) { return d.date }));
        y.domain(d3.extent(data, function(d) { return d.value }));

    line.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d.date) })
            .y(function (d) { return y(d.value) })
        );

    line.append("g")
        .attr("class", "brush")
        .call(brush);

    svg.on("dblclick", function () {
        x.domain(d3.extent(data, function (d) { return d.date; }))
        xAxis.transition().call(d3.axisBottom(x))
        line
            .select('.line')
            .transition()
            .attr("d", d3.line()
                .x(function (d) { return x(d.date) })
                .y(function (d) { return y(d.value) })
            )

        var layout = {
            title: 'COVID-19 US Daily Cases by state',
            height: 400,
            width: 500
        };

        Plotly.newPlot('line', data, layout);
    });
});