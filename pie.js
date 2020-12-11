d3.json("/pie").then((response) => {

    console.log(response);

    var deaths = response.deaths;
    var recovered = response.recovered;
    var active = response.active;

    console.log(deaths);
    console.log(recovered);
    console.log(active);

    var data = [2, 4, 8, 10];

    var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

    var pie = d3.pie().value(function(d) { 
        return d.percent; 
        });

    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
        
    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - 80);        

    var arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")

    arcs.append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", arc);

    arcs.append("text")
        .attr("transform", function(d) { 
                return "translate(" + label.centroid(d) + ")"; 
        })
        .text(function(d) { return d.data.i; });

    var layout = {
        title: 'COVID-19 US Daily Cases',
        height: 400,
        width: 500
    };
    
    Plotly.newPlot('bar', data, layout);
});