// Creating the map and setting the access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb2Vsb2giLCJhIjoiY21sZ3UwZWYzMDIyazNocHNmcnFvbWZiNCJ9.S_Bvs5AGp4m2AF22M0fdiQ'; // Mapbox access token

const map = new mapboxgl.Map({
    container: 'my-map', // ID of the HTML element to contain the map
    style: 'mapbox://styles/chloeloh/cmm9ci4gs001301ry3yjqgd6x', // Map style URL
    center: [-79.3053, 43.6672], // Initial starting position on the Beach BIA
    zoom: 13.8, // Initial zoom position
    maxBounds: [
        [-79.80, 43.65], // Southwest coordinates of the map bounds
        [-79.25, 43.80] // Northeast coordinates of the map bounds
    ]   
});

// Adds search control to map with plugin as source
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken, // Mapbox access token
        mapboxgl: mapboxgl, // Mapbox GL instance
        bbox: [-79.35, 43.65, -79.25, 43.68], // Limit results to maxBounds
        placeholder: 'Search in the Beaches BIA', // Placeholder text in the search bar
        marker: false // Disable the default marker that appears when a search result is selected
    }),
    'top-left' // Position of the search control on the map
);


// Adding navigation controls to the map (zoom and rotation)
map.addControl(new mapboxgl.NavigationControl());


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

    map.addLayer({
        id: 'locations-layer',
        type: 'symbol',
        source: 'points-of-interest',
        layout: {
            'icon-image': ['match', ['get', 'category'], // Using the "category" property in the GeoJSON to determine which icon to use
                'Coffee', 'mug', // If "category" is "coffee", use the "mug" icon
                'Landmark/Attraction', 'star2', // If "category" is "landmark/attraction", use the "star2" icon
                'Parks/Greenspaces', 'highway-rest-area', // If "category" is "park", use the "park" icon
                'Recreation', 'stadium', // If "category" is "recreation", use the "stadium" icon
                'marker' // Default icon
            ]
        },
        paint: {
            'icon-color': ['match', ['get', 'category'], // Using the "category" property in the GeoJSON to determine which color to use
                'Coffee', '#7a2e02ff', // If "category" is "coffee", use brown
                'Landmark/Attraction', '#fff700ff', // If "category" is "landmark/attraction", use yellow
                'Parks/Greenspaces', '#008000', // If "category" is "park", use green
                'Recreation', '#0026ffff', // If "category" is "recreation", use blue
                '#FFFFFF' // Default color (white)
            ]
        }
    });
});