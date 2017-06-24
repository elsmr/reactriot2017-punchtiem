import React, { Component } from 'react';

import { getVenues, getScore } from './helpers/foursquare';

import InteractiveMap from './components/InteractiveMap';
import Loading from './components/Loading';
import BottomBar from './components/BottomBar';

const Item = ({ name, location: { lat, lng } }) =>
  <div style={{ border: '1px solid black' }}>
    <p>{name}</p>
    <p>{lat}</p>
    <p>{lng}</p>
  </div>;

const navigationError = () =>
  alert(`oops, your device doesn't have geolocation capabilities`);

function distance(first, second) {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((second.latitude - first.latitude) * p) / 2 +
    c(first.latitude * p) *
      c(second.latitude * p) *
      (1 - c((second.longitude - first.longitude) * p)) /
      2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

const byDistance = center => (a, b) =>
  distance({ latitude: b.location.lat, longitude: b.location.lng }, center) -
  distance({ latitude: a.location.lat, longitude: a.location.lng }, center);

class Foursquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      query: {
        radius: 100,
        categoryId: process.env.REACT_APP_FOURSQUARE_CATEGORY, // arts & entertainment
      },
      history: [],
    };
  }

  componentWillMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        position => {
          const { coords: { latitude, longitude } } = position;

          this.setState(prev => {
            return {
              ...prev,
              position,
              history: [...prev.history, [longitude, latitude]],
            };
          });

          getVenues({
            latitude,
            longitude,
            ...this.state.query,
          }).then(({ response: { venues } }) => {
            venues.sort(byDistance({ latitude, longitude }));
            this.setState(prev => ({ ...prev, venues: venues }));
          });
        },
        console.warn,
        {
          enableHighAccuracy: true,
          maximumAge: 500,
        }
      );
    } else {
      navigationError();
    }
  }

  render() {
    const { position, venues, history } = this.state;

    const loading = !position || venues.length === 0;
    if (loading) {
      return (
        <div style={{ height: 'calc(100vh - 64px)' }}>
          <Loading />
        </div>
      );
    }

    const { coords: { latitude, longitude } } = position;
    const here = [longitude, latitude];
    console.log(venues[0].stats, getScore(venues[0].stats));
    const closest = {
      ...venues[0],
      score: getScore(venues[0].stats),
    };

    return (
      <div>
        <InteractiveMap here={here} venues={venues} history={history} />
        <BottomBar
          position={position}
          progress={Math.random() * 100}
          isNear={closest.location.distance < 20}
          closest={closest}
        />
        {this.state.venues.map(item => <Item {...item} key={item.id} />)}
      </div>
    );
  }
}

export default Foursquare;
