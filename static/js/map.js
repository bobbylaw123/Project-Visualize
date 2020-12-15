var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});
function createMap(){

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: "pk.eyJ1IjoicnVzc2lhbnZvZGthNjUiLCJhIjoiY2tpaXE0emh3MDF1bjJxbjZnajd3NDF0YSJ9.6Iuvmv7nXzsScE9YWkGgoQ"
    }).addTo(myMap);
}

function createChart(requested_date) {
    d3.json(`/map?requested_date=${"latest_data"}`).then(response => {
        var location = response.location;
        var coordinates = response.coordinates;
        var confirmed = response.confirmed;
        var recovered = response.recovered;
        var deaths = response.deaths;

        for (var i = 0; i < location.length; i++) {
        L.circle(coordinates[i], {
                fillOpacity: 0.75,
                color: "red",
                fillColor: "red",
                radius: confirmed[i] / 4
            }).bindPopup("<h3>" + location[i] + "</h3> <h6>" + coordinates[i][0] + ", " + coordinates[i][1] +
                "</h6> <hr> <h4>Total: " + confirmed[i] + "</h4> <h4>Affected: " + recovered[i] +
            "</h4><h4>Deaths: " + deaths[i] + "</h4>").addTo(myMap);
        }
    })
}

function init() {
  d3.json("/table_names").then((response) => {
      console.log(response);
    // Drop down menu set up by appending every table_name into said menu.
    var dropdownMenu = document.getElementById("dropdown");
    for (let i = 0; i < response.length; i++){
        let newOption = document.createElement("option");
        newOption.innerHTML = response[i].table_name
            dropdownMenu.appendChild(newOption)
        }
    })
  createMap();
  createChart('latest_data');
}

var dropdownMenu = document.getElementById("dropdown");
dropdownMenu.addEventListener("change", (event)=>{
    d3.json(`/map?requested_date=${event.target.value}`).then(response => {
    var location = response.location;
    var coordinates = response.coordinates;
    var confirmed = response.confirmed;
    var recovered = response.recovered;
    var deaths = response.deaths;

    for (var i = 0; i < location.length; i++) {
        L.circle(coordinates[i], {
                            fillOpacity: 0.75,
                            color: "red",
                            fillColor: "red",
                            radius: confirmed[i] / 4
                            }).bindPopup("<h3>" + location[i] + "</h3> <h6>" + coordinates[i][0] + ", " + coordinates[i][1] +
                "</h6> <hr> <h4>Total: " + confirmed[i] + "</h4> <h4>Affected: " + recovered[i] +
            "</h4><h4>Deaths: " + deaths[i] + "</h4>").addTo(myMap);
    }
  })
});

init();