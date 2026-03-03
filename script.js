// Creating the map and setting the access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb2Vsb2giLCJhIjoiY21sZ3UwZWYzMDIyazNocHNmcnFvbWZiNCJ9.S_Bvs5AGp4m2AF22M0fdiQ'; // Mapbox access token

const map = new mapboxgl.Map({
    container: 'my-map', // ID of the HTML element to contain the map
    style: 'mapbox://styles/chloeloh/cmm9ci4gs001301ry3yjqgd6x', // Map style URL
    center: [-79.3053, 43.6672], // Initial starting position on the Beach BIA
    maxBounds: [
        [-79.80, 43.65], // Southwest coordinates of the map bounds
        [-79.25, 43.80] // Northeast coordinates of the map bounds
    ],
    zoom: 13.8, // Initial zoom position
});

// Adds search control to map with plugin as source
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken, // Mapbox access token
        mapboxgl: mapboxgl, // Mapbox GL instance
        bbox: [-79.35, 43.65, -79.25, 43.68], // Limit results to maxBounds
        placeholder: 'Search in the Beach BIA', // Placeholder text in the search bar
        marker: false // Disable the default marker that appears when a search result is selected
    }),
    'top-left' // Position of the search control on the map
);


// Adds navigation controls to the map (zoom and rotation)
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
            ],
            'icon-size': 1.5, // Size of the icons
            'icon-allow-overlap': true // Allow icons to overlap each other
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

    // Change cursor to pointer when hovering over a point of interest
    map.on('mouseenter', 'locations-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer'; // Change cursor to pointer when hovering over a point of interest
    });

    // Change cursor back to default when not hovering over a point of interest
    map.on('mouseleave', 'locations-layer', () => {
        map.getCanvas().style.cursor = '';
    });

    // Adding a hover effect to the points of interest layer to show a popup with the name of the location
    const hoverPopup = new mapboxgl.Popup({
        closeButton: false, // Disable the default close button on the popup
        closeOnClick: false // Disable closing the popup when clicking on the map
    });

    map.on('mousemove', 'locations-layer', (e) => {
        console.log('Hovered over:', e.features[0].properties.name); // Log the name of the location being hovered over to the console
        if (e.features.length > 0) {
            map.getCanvas().style.cursor = 'pointer'; // Change cursor to pointer when hovering over a point of interest

            const feature = e.features[0]; // Get the first feature that the mouse is hovering over
            const coordinates = feature.geometry.coordinates.slice(); // Get the coordinates of the feature
            const name = feature.properties.name; // Get the "name" property from the feature's properties

            // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being hovered over
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            hoverPopup.setLngLat(coordinates).setHTML(`<strong>${name}</strong>`).addTo(map); // Set the popup's position and content, then add it to the map
        }
    });

    map.on('mouseleave', 'locations-layer', () => {
        map.getCanvas().style.cursor = ''; // Change cursor back to default when not hovering over a point of interest
        hoverPopup.remove(); // Remove the popup when the mouse leaves the point of interest
    });

});

