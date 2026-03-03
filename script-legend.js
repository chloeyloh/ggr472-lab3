// Creating legend to define and match the categories of points of interest on the map
const legenditems = [
    { category: 'Coffee Spots', color: '#7a2e02ff' },
    { category: 'Landmark/Attraction', color: '#fff700ff' },
    { category: 'Parks/Greenspaces', color: '#008000' },
    { category: 'Recreation', color: '#0026ffff' }
];

const legend = document.getElementById('legend');

// Looping through the legend items to create a row for each category
legenditems.forEach(({category, color}) => {
    const row = document.createElement('div');
    const colcircle = document.createElement('span');
    
    colcircle.className = 'legend-colcircle';
    colcircle.style.backgroundColor = color;

    const text = document.createElement('span');
    text.textContent = category;

    row.append(colcircle, text);
    legend.appendChild(row);
});
