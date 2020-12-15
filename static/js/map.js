d3.json(`/map?requested_date=${"latest_data"}`).then(response => {
    console.log(response);

    var location = response.location;
    var coordinates = response.coordinates;
    var active = response.active;
    var deaths = response.deaths;

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

    for (var i = 0; i < location.length; i++) {
      L.circle(coordinates[i], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "red",
        radius: active[i] / 10
      }).bindPopup("<h1>" + location[i] + "</h1> <hr> <h3>Cases: " + active[i] + "</h3>").addTo(myMap);
    }
  })