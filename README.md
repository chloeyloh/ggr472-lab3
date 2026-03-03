# Points of Interest at the Beach BIA
## GGR472 Lab 3: Prototyping for the Beach BIA final project 
https://chloeyloh.github.io/ggr472-lab3/ 

### Overview
This lab is a prototype and supplement for our collaboration with the Beach BIA, which will be highlighting the community's parks and recreation features while also drawing attention to their commercial strip. 

### Map Features and Symbology
* **Classified Layer:** Uses `match` expression to classify GeoJSON data into four categories: **Coffee**, **Landmarks/Attractions**, **Parks/Greenspaces**, and **Recreation**.
* **Custom Icons:** Each category is represented by a unique icon (custom .svg imported for icons; `mug` for coffee, `stadium` for recreation).
* **Color Coding:** Points are assigned specific hex colors to differentiate category types.

### 2. Map Controls and HTML Elements
* **Geocoder:** Integrated a Mapbox search bar in the top-left corner, limited to the Beach BIA neighborhood.
* **Navigation Controls:** Added standard zoom and rotation tools for user accessibility.
* **Legend:** Defines categories and their corresponding colors in the bottom-right corner.

### 3. Interactivity and Event Listeners
* **Pop-up Windows:** Clicking on a feature opens a pop-up window displaying the `name` and `address` of the location.
* **Hover:** Uses `feature-state` logic to change the visual appearance (opacity) of icons when a user hovers over them.
* **Spatial Constraints:** The map uses `maxBounds` to keep the user focused on the study area, preventing panning away from the BIA core.

**Author**: Chloe Loh
**Course**: GGR472 - Developing Web Maps 