// Creating the map and setting the access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb2Vsb2giLCJhIjoiY21sZ3UwZWYzMDIyazNocHNmcnFvbWZiNCJ9.S_Bvs5AGp4m2AF22M0fdiQ'; // Mapbox access token

const map = new mapboxgl.Map({
    container: 'my-map', // ID of the HTML element to contain the map
    style: 'mapbox://styles/chloeloh/cmlguusrw00jx01qq87ehggny', // Map style URL
    center: [-79.3832, 43.6532], // Initial map starting position
    zoom: 12 // Initial zoom position
});

// Adding navigation controls to the map
map.addControl(new mapboxgl.NavigationControl(), 'top-right');

