import React, { Component } from 'react';
import { ref, firebaseAuth } from './helpers/firebase';
import { getVenues, getVenuePhoto, getScore } from './helpers/foursquare';
import { RUN_DURATION_SECONDS, FOURSQUARE_CATEGORIES } from './constants';
import App from './App';
import { message } from 'antd';

const navigationError = () =>
  alert(`oops, your device doesn't have geolocation capabilities`);

const initialState = {
  venues: [],
  venueImages: {},
  query: {
    radius: 500,
    categoryId: FOURSQUARE_CATEGORIES.join(','), // arts & entertainment
  },
  history: [],
  loaded: false,
  started: false,
  stopped: false,
  progressedS: 0,
  watchPositionId: 0,
  userHeading: 0,
  score: 0,
  visitedVenues: [],
  position: null,
};

class ConnectedApp extends Component {
  state = initialState;

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

    getVenues({
      latitude,
      longitude,
      ...this.state.query,
      blacklist: this.state.visitedVenues.map(({ id }) => id),
    }).then(venues => {
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
    this.setState({ started: true, stopped: false, progressedS: 0 });

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

    const date = new Date().toString();
    const { uid, displayName: name } = firebaseAuth().currentUser;
    const runId = ref
      .child('runs')
      .push({ name, score: 0, history: [], venues: [], date }).key;

    ref
      .child(`users/${uid}`)
      .once('value')
      .then(s => s.val())
      .then(s =>
        ref
          .child(`users/${uid}`)
          .set({ ...s, name, runs: { ...s.runs, [runId]: { score: 0, date } } })
      );

    this.setState(s => ({ ...s, runId }));
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.pushData({ final: true });
    this.setState(s => ({ ...s, started: false, stopped: true }));
  };

  updateRunState(state) {
    this.setState(prevState => Object.assign({}, prevState, state));
  }

  pushData({ final } = { final: false }) {
    const { runId, history, venues } = this.state;
    const path = `runs/${runId}`;

    const closest = venues && venues[0]
      ? {
          name: venues[0].name,
          location: venues[0].location,
          score: getScore(venues[0].stats),
          categories: venues[0].categories,
          id: venues[0].id,
        }
      : false;

    ref.child(path).once('value').then(sn => sn.val()).then(snapshot => {
      if (final) {
        const date = new Date().toString();
        ref.child(path).set({
          ...snapshot,
          history,
          date,
        });

        const { uid, displayName: name } = firebaseAuth().currentUser;

        ref.child(`users/${uid}`).once('value').then(s => s.val()).then(s =>
          ref.child(`users/${uid}`).set({
            ...s,
            name,
            runs: {
              ...s.runs,
              [runId]: {
                date,
                score: snapshot.score,
              },
            },
          })
        );

        this.reset();
      } else {
        const score = (snapshot.score ? snapshot.score : 0) + closest.score;
        const newRun = {
          ...snapshot,
          history,
          venues: snapshot.venues ? [...snapshot.venues, closest] : [closest],
          score,
        };
        ref.child(path).set(newRun).then(() => {
          message.success(<span>Image uploaded successfully</span>, 3);
        });
        newRun.visitedVenues = newRun.venues;
        delete newRun.venues;
        this.updateRunState(newRun);
        this.onPosition(this.state.position);
      }
    });
  }

  reset() {
    this.setState({ ...initialState, loaded: true });
  }

  render() {
    return (
      <App
        updateRunState={this.updateRunState.bind(this)}
        startTracking={this.startTracking.bind(this)}
        stopTracking={this.stopTracking.bind(this)}
        startTimer={this.startTimer.bind(this)}
        stopTimer={this.stopTimer.bind(this)}
        pushData={this.pushData.bind(this)}
        runState={this.state}
      />
    );
  }
}

export default ConnectedApp;
