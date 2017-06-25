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
    this.props.reset();
  }

  render() {
    const {
      runState: {
        position,
        userHeading,
        venues,
        venueImages,
        history,
        loaded,
        runId,
        visitedVenues,
      },
      showBottom,
      progress,
      pushData,
    } = this.props;

    if (loaded === false) {
      return <LoadingPage />;
    }

    const { coords: { latitude, longitude } } = position;
    const here = [longitude, latitude];

    const closest = venues && venues[0]
      ? {
          id: venues[0].id,
          name: venues[0].name,
          distance: venues[0].location.distance,
          score: getScore(venues[0].stats),
          categories: venues[0].categories,
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
              runId={runId}
              speed={position.speed}
              progress={progress}
              isNear={closest.distance < 20}
              closest={closest}
              visited={visitedVenues.length}
              onUploaded={pushData}
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
  pushData,
  reset,
}) =>
  <div>
    <Foursquare
      runState={runState}
      startTracking={startTracking}
      stopTracking={stopTracking}
      showBottom={runState.started}
      progress={100 * runState.progressedS / RUN_DURATION_SECONDS}
      pushData={pushData}
      reset={reset}
    />
    {runState.stopped
      ? <AfterRun
          totalPoints={runState.score}
          onStart={() => {
            reset();
            startTimer();
          }}
          runId={runState.runId}
        />
      : !runState.started && <BeforeRun onStart={startTimer} />}
  </div>;

export default Wrapper;
