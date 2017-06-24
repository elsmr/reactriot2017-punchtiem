import React, { Component } from 'react';

import foursquareApi from 'react-foursquare';

const foursquare = foursquareApi({
  clientID: process.env.REACT_APP_FOURSQUARE_ID,
  clientSecret: process.env.REACT_APP_FOURSQUARE_SECRET,
});

const Item = ({ name, location: { lat, lng } }) =>
  <div style={{ border: '1px solid black' }}>
    <p>{name}</p>
    <p>{lat}</p>
    <p>{lng}</p>
  </div>;

const Loading = () =>
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}
  >
    <strong>Loading</strong>
  </div>;

class Foursquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      query: {
        categoryId: process.env.REACT_APP_FOURSQUARE_CATEGORY, // arts & entertainment
      },
    };
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ position });
        const { coords: { latitude, longitude } } = position;
        foursquare.venues
          .getVenues({ ...this.state.query, ll: `${latitude},${longitude}` })
          .then(res => {
            this.setState({ items: res.response.venues });
          });
      });
    } else {
      alert(`oops, your device doesn't have geolocation capabilities`);
    }
  }

  render() {
    return (
      <div>
        {this.state.items.length === 0
          ? <Loading />
          : this.state.items.map(item => <Item {...item} key={item.id} />)}
      </div>
    );
  }
}

export default Foursquare;
