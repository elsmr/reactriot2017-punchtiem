import React, { Component } from 'react';
import { getScore, calculateHeading } from './helpers/foursquare';
import InteractiveMap from './components/InteractiveMap';
import LoadingPage from './components/LoadingPage';
import BottomBar, { BeforeRun, AfterRun } from './components/BottomBar';
import { RUN_DURATION_SECONDS } from './constants';

class Foursquare extends Component {
  componentWillMount() {
    this.props.startTracking();
  }

  componentWillUnmount() {
    this.props.stopTracking();
  }

  render() {
    const {
      runState: { position, userHeading, venues, venueImages, history, loaded },
      showBottom,
      progress,
    } = this.props;

    if (loaded === false) {
      return <LoadingPage />;
    }

    const { coords: { latitude, longitude } } = position;
    const here = [longitude, latitude];

    const closest = venues && venues[0]
      ? {
          name: venues[0].name,
          distance: venues[0].location.distance,
          score: getScore(venues[0].stats),
          heading: calculateHeading({
            from: { latitude, longitude },
            to: {
              latitude: venues[0].location.lat,
              longitude: venues[0].location.lng,
            },
            userHeading,
          }),
        }
      : {};

    return (
      <div>
        <InteractiveMap
          here={here}
          venues={venues}
          venueImages={venueImages}
          history={history}
          bearing={userHeading}
        />
        {showBottom
          ? <BottomBar
              speed={position.speed}
              progress={progress}
              isNear={closest.distance < 20}
              closest={closest}
            />
          : null}
      </div>
    );
  }
}

const Wrapper = ({
  runState,
  startTimer,
  stopTimer,
  startTracking,
  stopTracking,
}) =>
  <div>
    <Foursquare
      runState={runState}
      startTracking={startTracking}
      stopTracking={stopTracking}
      showBottom={runState.started}
      progress={100 * runState.progressedS / RUN_DURATION_SECONDS}
    />
    {runState.stopped
      ? <AfterRun onStart={startTimer} />
      : !runState.started && <BeforeRun onStart={startTimer} />}
  </div>;

export default Wrapper;
