import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import { PRIMARY_COLOR } from '../constants';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const markerStyle = (isPlaceholder) => ({
  borderRadius: '50px',
  border: `2px solid ${PRIMARY_COLOR}`,
  width: '36px',
  height: '36px',
  padding: isPlaceholder ? '3px' : '0px',
  backgroundColor: '#fff',
});

/*eslint-disable react/style-prop-object*/
const InteractiveMap = ({ here, venues, venueImages, history }) =>
  <Map
    style="mapbox://styles/mapbox/light-v9"
    containerStyle={{
      height: 'calc(70vh - 64px)',
      width: '100vw'
    }}
    zoom={[18]}
    center={here}
  >
    {venues.map(item =>
      <Marker coordinates={[item.location.lng, item.location.lat]}>
        <img
          style={markerStyle(!venueImages.hasOwnProperty(item.id))}
          src={
            venueImages[item.id] ||
            'http://simpleicon.com/wp-content/uploads/camera.svg'
          }
          alt={item.name}
        />
      </Marker>
    )}

    {here
      ? <Marker coordinates={here}>
          <span
            role="image"
            aria-label="running person"
            anchor="bottom"
            style={{ fontSize: '6em', opacity: 1 }}
          >
            {'🏃'}
          </span>
        </Marker>
      : null}

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
/*eslint-enable react/style-prop-object */

export default InteractiveMap;
