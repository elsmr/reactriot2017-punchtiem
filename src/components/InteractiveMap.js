import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { PRIMARY_COLOR } from '../constants';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const markerStyle = {
  borderRadius: '50px',
  border: `2px solid ${PRIMARY_COLOR}`,
  width: '36px',
  height: '36px',
  padding: '3px',
  backgroundColor: '#fff'
};

/*eslint-disable react/style-prop-object*/
const InteractiveMap = ({ here, venues, venueImages, history }) =>
  <Map
    style="mapbox://styles/mapbox/light-v9"
    containerStyle={{
      height: 'calc(70vh - 64px)',
      width: '100vw',
    }}
    zoom={[15]}
    center={here}
  >
    {venues.map(item =>
      <Marker coordinates={[item.location.lng, item.location.lat]}>
        <img style={markerStyle} src={venueImages[item.id] || 'http://simpleicon.com/wp-content/uploads/camera.svg'} alt={item.name} />
      </Marker>
    )}
    <Layer type="symbol" id="here" layout={{ 'icon-image': 'dot-11' }}>
      {here ? <Feature coordinates={here} /> : null}
    </Layer>
    <Layer
      type="line"
      id="history"
      layout={{
        'line-cap': 'round',
        'line-join': 'round',
      }}
      paint={{
        'line-color': PRIMARY_COLOR,
        'line-width': 8,
        'line-opacity': 0.8,
      }}
    >
      <Feature coordinates={history} />
    </Layer>
  </Map>;
/*eslint-enable react/style-prop-object */

export default InteractiveMap;
