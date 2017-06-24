import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const InteractiveMap = ({ here, items, position }) =>
  <Map
    style="mapbox://styles/mapbox/streets-v8"
    containerStyle={{
      height: '80vh',
      width: '100vw',
    }}
    center={here}
  >
    <Layer type="symbol" id="monuments" layout={{ 'icon-image': 'dot-11' }}>
      {items
        ? items.map(item =>
            <Feature
              key={item.id}
              coordinates={[item.location.lng, item.location.lat]}
            >
              test
            </Feature>
          )
        : null}
    </Layer>
    <Layer type="symbol" id="here" layout={{ 'icon-image': 'marker-15' }}>
      {position ? <Feature coordinates={here} /> : null}
    </Layer>
  </Map>;

export default InteractiveMap;
