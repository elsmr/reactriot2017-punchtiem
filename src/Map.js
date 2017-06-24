import React, { Component } from 'react';

import { getVenues } from './helpers/foursquare';
import InteractiveMap from './components/InteractiveMap';
import Loading from './components/Loading';

const Item = ({ name, location: { lat, lng } }) =>
  <div style={{ border: '1px solid black' }}>
    <p>{name}</p>
    <p>{lat}</p>
    <p>{lng}</p>
  </div>;

const navigationError = () =>
  alert(`oops, your device doesn't have geolocation capabilities`);

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
              history: [...prev.history, { latitude, longitude }],
            };
          });

          getVenues({ latitude, longitude, ...this.state.query }).then(res => {
            this.setState(prev => ({ ...prev, venues: res.response.venues }));
          });
        },
        console.warn,
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      navigationError();
    }
  }

  render() {
    const { position, venues } = this.state;

    const loading = !position || venues === 0;
    if (loading) {
      return <Loading />;
    }

    const { coords: { latitude, longitude } } = position;
    const here = [longitude, latitude];

    return (
      <div>
        <InteractiveMap here={here} venues={this.state.venues} />
        {this.state.venues.map(item => <Item {...item} key={item.id} />)}
      </div>
    );
  }
}

export default Foursquare;
