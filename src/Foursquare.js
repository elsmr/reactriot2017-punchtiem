import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
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

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

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
      navigator.geolocation.watchPosition(position => {
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
    const here = this.state.position
      ? [
          this.state.position.coords.longitude,
          this.state.position.coords.latitude,
        ]
      : [0, 0];
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v8"
          containerStyle={{
            height: '80vh',
            width: '100vw',
          }}
          center={here}
        >
          <Layer
            type="symbol"
            id="monuments"
            layout={{ 'icon-image': 'marker-10' }}
          >
            {this.state.items
              ? this.state.items.map(item =>
                  <Popup
                    key={item.id}
                    coordinates={[item.location.lng, item.location.lat]}
                  >
                    test
                  </Popup>
                )
              : null}
          </Layer>
          <Layer type="symbol" id="here" layout={{ 'icon-image': 'marker-15' }}>
            {this.state.position ? <Feature coordinates={here} /> : null}
          </Layer>
        </Map>
        {this.state.items.length === 0
          ? <Loading />
          : this.state.items.map(item => <Item {...item} key={item.id} />)}
      </div>
    );
  }
}

export default Foursquare;
