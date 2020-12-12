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
  var cities = [
    {
      name: "New York",
      location: [40.7128, -74.0059],
      population: 8550405
    },
    {
      name: "Chicago",
      location: [41.8781, -87.6298],
      population: 2720546
    },
    {
      name: "Houston",
      location: [29.7604, -95.3698],
      population: 2296224
    },
    {
      name: "Los Angeles",
      location: [34.0522, -118.2437],
      population: 3971883
    },
    {
      name: "Omaha",
      location: [41.2524, -95.9980],
      population: 446599
    }
  ];
  function databaseConnection(){
    var pg = require('pg');
    var connectionString = "postgres://postgres:postgres@PostgreSQl 13/localhost:5432/covid_cases";
    var 
  }
  for (var i = 0; i < cities.length; i++) {
    L.circle(cities[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      radius: markerSize(cities[i].population)
    }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
  }