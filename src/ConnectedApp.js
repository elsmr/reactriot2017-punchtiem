import React, { Component } from 'react';
import { ref, firebaseAuth } from './helpers/firebase';
import { getVenues, getVenuePhoto, getScore } from './helpers/foursquare';
import { RUN_DURATION_SECONDS } from './constants';
import App from './App';

const navigationError = () =>
  alert(`oops, your device doesn't have geolocation capabilities`);

class ConnectedApp extends Component {
  state = {
    venues: [],
    venueImages: {},
    query: {
      radius: 100,
      categoryId: process.env.REACT_APP_FOURSQUARE_CATEGORY, // arts & entertainment
    },
    history: [],
    loaded: false,
    started: false,
    stopped: false,
    progressedS: 0,
    watchPositionId: 0,
    userHeading: 0,
  };

  startTracking() {
    if ('geolocation' in navigator) {
      const watchPositionId = navigator.geolocation.watchPosition(
        this.onPosition,
        console.warn,
        { enableHighAccuracy: true }
      );
      this.watchPositionId = watchPositionId;
    } else {
      navigationError();
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this._setHeading);
    }
  }

  _setHeading = e =>
    this.setState(s => ({
      ...s,
      userHeading: e.alpha || e.webkitCompassHeading,
    }));

  stopTracking() {
    navigator.geolocation.clearWatch(this.watchPositionId);
    window.removeEventListener('deviceorientation', this._setHeading);
  }

  onPosition = position => {
    const { coords: { latitude, longitude } } = position;

    this.setState(prev => {
      return {
        ...prev,
        position,
        history: prev.started
          ? [...prev.history, [longitude, latitude]]
          : prev.history,
        loaded: true,
      };
    });

    getVenues({ latitude, longitude, ...this.state.query }).then(res => {
      const { response: { venues } } = res;
      const _venues = venues
        .slice()
        .sort((a, b) => a.location.distance - b.location.distance)
        .filter(({ stats }) => getScore(stats) > 0);
      this.setState(prev => ({ ...prev, venues: _venues }));

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
    });
  };

  startTimer = () => {
    this.setState({ started: true, progressedS: 0 });

    this.timer = setInterval(() => {
      if (RUN_DURATION_SECONDS > this.state.progressedS) {
        this.setState(state => ({
          ...state,
          progressedS: state.progressedS + 1,
        }));
      } else {
        this.stopTimer();
      }
    }, 1000);

    const { uid, displayName: name } = firebaseAuth().currentUser;
    const runId = ref
      .child('runs')
      .push({ name, points: 0, history: [], venues: [] }).key;

    ref
      .child(`users/${uid}`)
      .once('value')
      .then(s => s.val())
      .then(s =>
        ref
          .child(`users/${uid}`)
          .set({ ...s, name, runs: { ...s.runs, [runId]: true } })
      );

    this.setState(s => ({ ...s, runId }));
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState(s => ({ ...s, started: false, stopped: true }));
  };

  render() {
    return (
      <App
        startTracking={this.startTracking.bind(this)}
        stopTracking={this.stopTracking.bind(this)}
        startTimer={this.startTimer.bind(this)}
        stopTimer={this.stopTimer.bind(this)}
        runState={this.state}
      />
    );
  }
}

export default ConnectedApp;
