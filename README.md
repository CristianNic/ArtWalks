# Art Walks

A mobile friendly React app that encourages user to walk around the city, find, save, and explore all Vancouver Public Art Works using an interactive map. Photo gallery and art work descriptions are provided.

Server built using Node, Express, MySQL. Client developed with React, Express, Leaflet, and Mapbox.

Data provided from the City of Vancouver Open Data Portal.

<p align="center" style="{display: block;}">
<img src="../assets/login.png" width="260"/><img src="../assets/map.png" width="260"/><img src="../assets/map-popup.png" width="260"/>
<img src="../assets/gallery.png" width="260"/><img src="../assets/gallery-expander.png" width="260"/><img src="../assets/saved.png" width="260"/>
<img src="../assets/details.png" width="260"><img src="../assets/profile.png" width="260"><img src="../assets/blank.png" width="260">
</p>

## Usage

- Install modules inside client and server folders `npm install`

- Map tiles will require a Mapbox token which can be obtained after [signing up](https://www.mapbox.com/). Alternatively the OpenStreetMap tile layer can be uncommented in ArtMap.jsx. See instructions inside `client/src/utils/MapboxToken-Sample.js` on how a Mapbox token is composed.

  Sample token:

  ```js
  URL_CUSTOM_OUTDOORS = `https://api.mapbox.com/styles/v1/${USERNAME}/${STYLE_OUTDOORS}/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`;
  ```

  After having decided on a tile layer rename `MapboxToken-Sample.js` to `MapboxToken.js` and it will be kept local by `.gitignore`

- City of Vancouver Public Art Work data is included under `server/data/public-art.csv` It was downloaded from the City of Vancouver Open Data Portal [Public Art](https://opendata.vancouver.ca/explore/dataset/public-art/export/).

- The resulting seed file has already been included. This is how it was generated:

  The original data needed to be formatted so it could be loaded into the MySQL database as a seed file. It also required adding photo jpg URLs for each art work by retrieving them from the city. The process is broken down as much as possible into two steps, formatting and then adding missing URLs.

  ```sh
  cd server/data/csv-to-seed-data
  node Step1-csv-to-json
  node Step2-json-to-json
  ```

  Open the file created and add `module.exports =` in front of the art work array. Place the file inside `server/seed_data`

- Create tables and seed data `npm run migrate && npm run seed`

- Inside client and server folders `npm start` Run and enjoy!
