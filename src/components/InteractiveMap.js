import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import { Icon, Tooltip } from 'antd';
import { PRIMARY_COLOR } from '../constants';
import { getScore } from '../helpers/foursquare';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const markerStyle = {
  borderRadius: '50px',
  border: `2px solid ${PRIMARY_COLOR}`,
  width: '36px',
  height: '36px',
  backgroundColor: '#fff',
};

const placeholderIconStyle = {
  fontSize: '24px',
  margin: '0 auto',
};

const placeholderMarkerStyle = {
  ...markerStyle,
  display: 'flex',
  justifyCOntent: 'center',
  alignItems: 'center',
};

const hereStyle = {
  width: '56px',
  height: '56px',
};

const Venues = ({ venues, venueImages }) =>
  <div>
    {venues.map(({ id, name, location: { lat, lng }, stats }) => {
      const isPlaceholder = !venueImages.hasOwnProperty(id);
      return (
        <Marker coordinates={[lng, lat]} key={id}>
          <Tooltip title={`${name} (${getScore(stats)}p)`}>
            {isPlaceholder
              ? <div style={placeholderMarkerStyle}>
                  <Icon style={placeholderIconStyle} type="camera" />
                </div>
              : <img style={markerStyle} src={venueImages[id]} alt={name} />}
          </Tooltip>
        </Marker>
      );
    })}
  </div>;

const Here = ({ here }) =>
  here
    ? <Marker coordinates={here} anchor="bottom">
        <img
          style={hereStyle}
          src="https://emojipedia-us.s3.amazonaws.com:443/cache/e0/3a/e03a2808671f820654ce033557d25212.png"
          alt="Woman running"
        />
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
const InteractiveMap = ({ here, venues, venueImages, history, bearing }) =>
  <Map
    style="mapbox://styles/mapbox/light-v9"
    containerStyle={{
      height: 'calc(70vh - 64px)',
      width: '100vw',
    }}
    zoom={[18]}
    center={here}
    bearing={bearing}
  >
    <Venues venues={venues} venueImages={venueImages} />
    <Here here={here} />
    <History history={history} />
  </Map>;
/*eslint-enable react/style-prop-object */

export default InteractiveMap;
