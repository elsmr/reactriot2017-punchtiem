import React from 'react';
import ReactMapboxGl, {
  Layer,
  Feature,
  Marker,
  ZoomControl,
} from 'react-mapbox-gl';
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
  justifyContent: 'center',
  alignItems: 'center',
};

const hereStyle = {
  width: '56px',
  height: '56px',
};

const Venues = ({ venues, venueImages }) =>
  <div>
    {venues.map(
      ({ id, name, location: { lat, lng }, stats, score = false }) => {
        const isPlaceholder = !venueImages.hasOwnProperty(id);
        return (
          <Marker coordinates={[lng, lat]} key={id}>
            <Tooltip title={`${name} (${score ? score : getScore(stats)}p)`}>
              {isPlaceholder
                ? <div style={placeholderMarkerStyle}>
                    <Icon style={placeholderIconStyle} type="camera" />
                  </div>
                : <img style={markerStyle} src={venueImages[id]} alt={name} />}
            </Tooltip>
          </Marker>
        );
      }
    )}
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

function getCenter({ here, venues, history }) {
  if (here) {
    return here;
  }
  if (venues.length > 0) {
    return [venues[0].location.lng, venues[0].location.lat];
  }
  if (history && history.length > 0) {
    return history[0];
  }
  return undefined;
}

/*eslint-disable react/style-prop-object*/
const InteractiveMap = ({
  here,
  venues,
  venueImages,
  history,
  bearing,
  zoom = 16.5,
}) =>
  <Map
    style="mapbox://styles/mapbox/light-v9"
    containerStyle={{
      height: 'calc(70vh - 64px)',
      width: '100vw',
    }}
    zoom={[zoom]}
    pitch={60}
    center={getCenter({ here, venues, history })}
    bearing={bearing}
  >
    <ZoomControl />
    <Venues venues={venues} venueImages={venueImages} />
    {here && <Here here={here} />}
    <History history={history} />
    <Layer
      id="3d-buildings"
      sourceId="composite"
      layerOptions={{
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 14,
      }}
      paint={{
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': {
          type: 'identity',
          property: 'height',
        },
        'fill-extrusion-base': {
          type: 'identity',
          property: 'min_height',
        },
        'fill-extrusion-opacity': 0.6,
      }}
    />
  </Map>;
/*eslint-enable react/style-prop-object */

export default InteractiveMap;
