d3.json("/line").then((response) => {

    console.log(response);

    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var deaths = response.deaths;
    var recovered = response.recovered;
    var active = response.active;

    console.log(deaths);
    console.log(recovered);
    console.log(active);

    var data = [2, 4, 8, 10];

    var svg = d3.select("#line")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

    var pie = d3.pie().value(function (d) {
        return d.percent;
    });

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

    line
        .append("g")
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