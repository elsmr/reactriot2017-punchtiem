import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import { PRIMARY_COLOR } from '../constants';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const InteractiveMap = ({ here, venues, history }) =>
  <Map
    style="mapbox://styles/mapbox/light-v9"
    containerStyle={{
      height: 'calc(70vh - 64px)',
      width: '100vw'
    }}
    zoom={[15]}
    center={here}
  >
    <Layer type="symbol" id="monuments" layout={{ 'icon-image': 'marker-15' }}>
      <Feature
        coordinates={venues.map(item => [item.location.lng, item.location.lat])}
      />
    </Layer>
    <Layer type="symbol" id="here" layout={{ 'icon-image': 'dot-11' }}>
      {here ? <Feature coordinates={here} /> : null}
    </Layer>
    <Layer
      type="line"
      id="history"
      layout={{
        'line-cap': 'round',
        'line-join': 'round'
      }}
      paint={{
        'line-color': PRIMARY_COLOR,
        'line-width': 8,
        'line-opacity': 0.8
      }}
    >
      <Feature coordinates={history} />
    </Layer>
  </Map>;

export default InteractiveMap;
