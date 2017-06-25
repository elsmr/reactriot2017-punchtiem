import React, { Component } from 'react';
import { Timeline, Tag } from 'antd';
import InteractiveMap from './InteractiveMap';
import LoadingPage from './LoadingPage';
import { PRIMARY_COLOR } from '../constants';
import { getVenuePhoto } from '../helpers/foursquare';
import { ref } from '../helpers/firebase';

const RunNotFound = () =>
  <div
    style={{
      display: 'flex',
      height: 'calc(100vh - 64px)',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1>
      Run not found{' '}
      <span role="img" aria-label="that's actually quite sad">😢</span>
    </h1>
  </div>;

class Run extends Component {
  state = {
    venues: null,
    venueImages: {},
    history: null,
    name: null,
    loading: true,
    notFound: false,
    score: 0,
  };

  componentWillMount() {
    const { match } = this.props;
    ref
      .child(`runs/${match.params.id}`)
      .once('value', this.receiveRun.bind(this), this.runNotFound.bind(this));
  }

  receiveRun(snapshot) {
    const record = snapshot.val();
    if (!record) {
      this.runNotFound();
      return;
    }

    const { history, name, score, venues = [] } = record;
    this.setState({ venues, history, name, score, loading: false });
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
  }

  runNotFound() {
    this.setState({ loading: false, notFound: true });
  }

  render() {
    const {
      notFound,
      loading,
      name,
      venues = [],
      venueImages,
      history,
      score,
    } = this.state;
    if (notFound) {
      return <RunNotFound />;
    }

    return loading
      ? <LoadingPage />
      : <div>
          <InteractiveMap
            venueImages={venueImages}
            venues={venues}
            history={history}
            zoom={16}
          />
          <div style={{ margin: '2em' }}>
            <h1
              style={{ margin: '2em 0', display: 'flex', alignItems: 'center' }}
            >
              <span>Run by {name}{' '}</span>
              <Tag style={{ marginLeft: '.5em' }} color={PRIMARY_COLOR}>
                {score}p
              </Tag>
            </h1>
            <Timeline>
              {venues.map(({ id, name, score }) =>
                <Timeline.Item key={id}>
                  {name}{' '}
                  <Tag color={PRIMARY_COLOR}>
                    {score}p
                  </Tag>
                </Timeline.Item>
              )}
            </Timeline>
          </div>
        </div>;
  }
}

export default Run;
