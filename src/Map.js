import React, { Component } from 'react';
import { getVenues, getVenuePhoto, getScore } from './helpers/foursquare';
import InteractiveMap from './components/InteractiveMap';
import Loading from './components/Loading';
import BottomBar, { BeforeRun, AfterRun } from './components/BottomBar';

const navigationError = () =>
  alert(`oops, your device doesn't have geolocation capabilities`);

class Foursquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      venueImages: {},
      query: {
        radius: 100,
        categoryId: process.env.REACT_APP_FOURSQUARE_CATEGORY, // arts & entertainment
      },
      history: [],
      loaded: false,
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
              loaded: true,
            };
          });

          getVenues({ latitude, longitude, ...this.state.query }).then(res => {
            const { response: { venues } } = res;
            venues.sort((a, b) => a.location.distance - b.location.distance);
            venues.forEach(venue => {
              if (!this.state.venueImages.hasOwnProperty(venue.id)) {
                getVenuePhoto(venue.id).then(res => {
                  if (res.response.photos.count > 0) {
                    const { prefix, suffix } = res.response.photos.items[0];
                    const url = `${prefix}36x36${suffix}`;
                    this.setState(state => ({
                      ...state,
                      venueImages: {
                        ...state.venueImages,
                        [venue.id]: url,
                      },
                    }));
                  }
                });
              }
            });
            this.setState(prev => ({ ...prev, venues: res.response.venues }));
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
    const { position, venues, venueImages, history, loaded } = this.state;
    const { showBottom, progress } = this.props;

    if (loaded === false) {
      return (
        <div style={{ height: 'calc(100vh - 64px)' }}>
          <Loading />
        </div>
      );
    }

    const { coords: { latitude, longitude } } = position;
    const here = [longitude, latitude];

    const closest = venues && venues[0]
      ? {
          name: venues[0].name,
          distance: venues[0].location.distance,
          score: getScore(venues[0].stats),
          heading: 0, // calc direction to walk
        }
      : {};

    return (
      <div>
        <InteractiveMap
          here={here}
          venues={venues}
          venueImages={venueImages}
          history={history}
        />
        {showBottom
          ? <BottomBar
              position={position}
              progress={progress}
              isNear={closest.distance < 20}
              closest={closest}
            />
          : null}
      </div>
    );
  }
}

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      stopped: false,
      progressedS: 0,
    };
  }

  _startTimer = () => {
    const { totalS } = this.props;
    this.setState({ started: true });

    this.timer = setInterval(() => {
      if (totalS > this.state.progressedS) {
        this.setState(state => ({
          ...state,
          progressedS: state.progressedS + 1,
        }));
      } else {
        this._stopTimer();
      }
    }, 1000);
  };

  _stopTimer = () => {
    clearInterval(this.timer);
    this.setState(s => ({ ...s, started: false, stopped: true }));
  };

  render() {
    const { totalS } = this.props;
    const { started, stopped, progressedS } = this.state;

    return (
      <div>
        <Foursquare
          showBottom={started}
          progress={100 * progressedS / totalS}
        />
        {stopped
          ? <AfterRun onStart={this._startTimer} />
          : <BeforeRun onStart={this._startTimer} />}
      </div>
    );
  }
}

export default Wrapper;
