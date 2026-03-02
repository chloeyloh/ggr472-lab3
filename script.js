// Creating the map and setting the access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb2Vsb2giLCJhIjoiY21sZ3UwZWYzMDIyazNocHNmcnFvbWZiNCJ9.S_Bvs5AGp4m2AF22M0fdiQ'; // Mapbox access token

const map = new mapboxgl.Map({
    container: 'my-map', // ID of the HTML element to contain the map
    style: 'mapbox://styles/chloeloh/cmm9ci4gs001301ry3yjqgd6x', // Map style URL
    center: [-79.3053, 43.6672], // Initial starting position on the Beach BIA
    zoom: 13.8 // Initial zoom position
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

    map.addLayer({
        id: 'locations-layer',
        type: 'symbol',
        source: 'points-of-interest',
        layout: {
            'icon-image': ['match', ['get', 'category'], // Using the "category" property in the GeoJSON to determine which icon to use
                'Coffee', 'mug', // If "category" is "coffee", use the "mug" icon
                'Landmark/Attraction', 'star2', // If "category" is "landmark/attraction", use the "star2" icon
                'Park/Greenspaces', 'highway-rest-area', // If "category" is "park", use the "park" icon
                'Recreation', 'stadium', // If "category" is "recreation", use the "stadium" icon
                'marker' // Default icon
            ]
        }
    });

        map.addLayer({
            id: 'locations-layer',
            type: 'symbol',
            source: 'points-of-interest',
            paint: {
                'icon-color': ['match', ['get', 'category'], // Using the "category" property in the GeoJSON to determine which color to use
                    'Coffee', '#7a2e02ff', // If "category" is "coffee", use brown
                    'Landmark/Attraction', '#fff700ff', // If "category" is "landmark/attraction", use yellow
                    'Park/Greenspaces', '#008000', // If "category" is "park", use green
                    'Recreation', '#0026ffff', // If "category" is "recreation", use blue
                    '#FFFFFF' // Default color (white)
                ]
            }
        });
    });