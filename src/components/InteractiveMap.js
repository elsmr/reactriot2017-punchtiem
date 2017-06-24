import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
// import { Icon } from 'antd';
import { PRIMARY_COLOR } from '../constants';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const markerStyle = isPlaceholder => ({
  borderRadius: '50px',
  border: `2px solid ${PRIMARY_COLOR}`,
  width: '36px',
  height: '36px',
  padding: isPlaceholder ? '3px' : '0px',
  backgroundColor: '#fff',
});

const Venues = ({ venues, venueImages }) =>
  <div>
    {venues.map(({ id, name, location: { lat, lng } }) =>
      <Marker coordinates={[lng, lat]} key={id}>
        <img
          style={markerStyle(!venueImages.hasOwnProperty(id))}
          src={
            venueImages[id] ||
            'http://simpleicon.com/wp-content/uploads/camera.svg'
          }
          alt={name}
        />
      </Marker>
    )}
  </div>;

const Here = ({ here }) =>
  here
    ? <Marker coordinates={here} anchor="bottom">
        <span
          role="img"
          aria-label="running person"
          style={{ fontSize: '6em', opacity: 1 }}
        >
          {'🏃🏽‍'}
        </span>
      </Marker>
    : null;

const History = ({ history }) =>
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
  </Layer>;

/*eslint-disable react/style-prop-object*/
const InteractiveMap = ({ here, venues, venueImages, history }) =>
  <Map
    style="mapbox://styles/mapbox/light-v9"
    containerStyle={{
      height: 'calc(70vh - 64px)',
      width: '100vw',
    }}
    zoom={[18]}
    center={here}
  >
    <Venues venues={venues} venueImages={venueImages} />
    <Here here={here} />
    <History history={history} />
  </Map>;
/*eslint-enable react/style-prop-object */

export default InteractiveMap;
