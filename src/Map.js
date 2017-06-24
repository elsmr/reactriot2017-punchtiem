import React, { Component } from 'react';
import foursquareApi from 'react-foursquare';

import InteractiveMap from './components/InteractiveMap';
import Loading from './components/Loading';

const foursquare = foursquareApi({
  clientID: process.env.REACT_APP_FOURSQUARE_ID,
  clientSecret: process.env.REACT_APP_FOURSQUARE_SECRET
});

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
      items: [],
      query: {
        radius: 100,
        categoryId: process.env.REACT_APP_FOURSQUARE_CATEGORY // arts & entertainment
      }
    };
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        position => {
          this.setState({ position });
          const { coords: { latitude, longitude } } = position;
          foursquare.venues
            .getVenues({ ...this.state.query, ll: `${latitude},${longitude}` })
            .then(res => {
              this.setState({ items: res.response.venues });
            });
        },
        console.warn,
        {
          enableHighAccuracy: true,
          timeout: 1000
        }
      );
    } else {
      navigationError();
    }
  }

  renderMap(here) {
    if ((here[0] === 0 && here[1] === 0) || this.state.items.length === 0) {
      return <Loading />;
    } else {
      const items = this.state.items.map(item =>
        <Item {...item} key={item.id} />
      );
      return (
        <div>
          <InteractiveMap
            here={here}
            items={this.state.items}
            position={this.state.position}
          />
          {items}
        </div>
      );
    }
  }

  render() {
    const here = this.state.position
      ? [
          this.state.position.coords.longitude,
          this.state.position.coords.latitude
        ]
      : [0, 0];
    return (
      <div>
        {this.renderMap(here)}
      </div>
    );
  }
}

export default Foursquare;
