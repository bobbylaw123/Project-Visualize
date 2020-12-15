var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

function createChart(requested_date) {
  d3.json(`/map?requested_date=${requested_date}`).then(response => {
    console.log(response);

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: "pk.eyJ1IjoicnVzc2lhbnZvZGthNjUiLCJhIjoiY2tpaXE0emh3MDF1bjJxbjZnajd3NDF0YSJ9.6Iuvmv7nXzsScE9YWkGgoQ"
    }).addTo(myMap);

    for (var i = 0; i < response.length; i++) {
      L.circle(response[i].coordinates, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "purple",
        radius: 100
      }).bindPopup("<h1>" + response[i].name + "</h1> <hr> <h3>Population: " + response[i].deaths + "</h3>").addTo(myMap);
    }
  })
}

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

var dropdownMenu = document.getElementById("dropdown")
dropdownMenu.addEventListener("change", (event)=>{
    d3.json(`/map?requested_date=${event.target.value}`).then(response => {
    console.log(response);

    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: "pk.eyJ1IjoicnVzc2lhbnZvZGthNjUiLCJhIjoiY2tpaXE0emh3MDF1bjJxbjZnajd3NDF0YSJ9.6Iuvmv7nXzsScE9YWkGgoQ"
    }).addTo(myMap);

    function markerSize(population) {
      return population / 40;
    }

    for (var i = 0; i < response.length; i++) {
      L.circle(response[i].coordinates, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "purple",
        radius: markerSize(response[i].deaths)
      }).bindPopup("<h1>" + response[i].name + "</h1> <hr> <h3>Population: " + response[i].deaths + "</h3>").addTo(myMap);
    }
  })

})

init();