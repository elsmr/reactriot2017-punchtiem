import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const InteractiveMap = ({ here, venues, history }) =>
  <Map
    style="mapbox://styles/mapbox/light-v9"
    containerStyle={{
      height: '70vh',
      width: '100vw',
    }}
    zoom={[15]}
    center={here}
  >
    <Layer type="symbol" id="monuments" layout={{ 'icon-image': 'dot-11' }}>
      <Feature
        coordinates={venues.map(item => [item.location.lng, item.location.lat])}
      />
    </Layer>
    <Layer type="symbol" id="here" layout={{ 'icon-image': 'marker-15' }}>
      {here ? <Feature coordinates={here} /> : null}
    </Layer>
    <Layer type="line" id="history">
      <Feature
        coordinates={history}
        layout={{
          'line-cap': 'round',
          'line-join': 'round',
        }}
        paint={{
          'line-color': '#4790E5',
          'line-width': 12,
        }}
      />
    </Layer>
  </Map>;

export default InteractiveMap;
