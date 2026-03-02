// Creating the map and setting the access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb2Vsb2giLCJhIjoiY21sZ3UwZWYzMDIyazNocHNmcnFvbWZiNCJ9.S_Bvs5AGp4m2AF22M0fdiQ'; // Mapbox access token

const map = new mapboxgl.Map({
    container: 'my-map', // ID of the HTML element to contain the map
    style: 'mapbox://styles/chloeloh/cmm9ci4gs001301ry3yjqgd6x', // Map style URL
    center: [-79.3832, 43.6532], // Initial starting position in downtown Toronto
    zoom: 12 // Initial zoom position
});

// Sets map load event listener to add the GeoJSON data source and layer
map.on('load', () => {
    // Adding my Mapbox style as a vector source to the map
    map.addSource('the-beach-pointsofinterest', {
        type: 'vector',
        url: 'mapbox://styles/chloeloh/cmm9ci4gs001301ry3yjqgd6x' // Map style URL containing GeoJSON data source
    });

    // Adding my GeoJSON for points of interest (coffee, parks, recreation)
    map.addSource('points-of-interest', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/chloeyloh/ggr472-lab3/refs/heads/main/lab3map.geojson' // Raw link to GeoJSON file in GitHub repository
    });

