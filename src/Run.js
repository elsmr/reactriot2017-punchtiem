import React, { Component } from 'react';
import { Timeline, Tag, Modal } from 'antd';
import InteractiveMap from './components/InteractiveMap';
import LoadingPage from './components/LoadingPage';
import { PRIMARY_COLOR } from './constants';
import { getVenuePhoto, distance } from './helpers/foursquare';
import { ref, firebaseImages } from './helpers/firebase';

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

class PhotoPreview extends Component {
  state = {
    url: '',
  };

  componentWillMount() {
    const { venue, run } = this.props;
    firebaseImages({ run, venue }).getDownloadURL().then(url => {
      this.setState({ url });
    });
  }

  render() {
    const { url } = this.state;
    const { venueName, style, onClick } = this.props;

    return url
      ? <img
          style={{
            objectFit: 'cover',
            border: `${PRIMARY_COLOR} 2px solid`,
            width: '100%',
            maxWidth: '600px',
            maxHeight: '25vh',
            background: '#fff',
            marginTop: '.5em',
            ...style,
          }}
          src={url}
          alt={venueName}
          onClick={onClick}
        />
      : null;
  }
}

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

  dismiss = () => this.setState(s => ({ ...s, modal: false }));

  selectModal = modal => this.setState(s => ({ ...s, modal }));

  render() {
    const {
      notFound,
      loading,
      name,
      venues = [],
      venueImages,
      history,
      score,
      modal,
    } = this.state;
    if (notFound) {
      return <RunNotFound />;
    }

    const _totalDistance = (history || [])
      .reduce(
        (acc, val, index, arr) =>
          index === 0
            ? 0
            : acc +
                distance(
                  { latitude: val[0], longitude: val[1] },
                  { latitude: arr[index - 1][0], longitude: arr[index - 1][1] }
                ),
        0
      );
    const totalDistance = Math.round(_totalDistance).toLocaleString();

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
              style={{
                margin: '2em 0',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <span>Run by {name}{' '}</span>
              <Tag style={{ marginLeft: '.5em' }} color={PRIMARY_COLOR}>
                {score}p
              </Tag>
              <Tag style={{ marginLeft: '.5em' }} color={PRIMARY_COLOR}>
                {totalDistance}m
              </Tag>
            </h1>

            <Timeline>
              {venues.map(({ id, name, score }) => {
                return (
                  <Timeline.Item
                    key={id}
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <div>
                      {name}{' '}
                      <Tag color={PRIMARY_COLOR}>
                        {score}p
                      </Tag>
                    </div>
                    <PhotoPreview
                      run={this.props.match.params.id}
                      venue={id}
                      venueName={name}
                      onClick={() => this.selectModal({ id, name })}
                    />
                  </Timeline.Item>
                );
              })}
            </Timeline>

            <Modal
              title={modal && modal.name}
              visible={modal}
              footer={null}
              onCancel={this.dismiss}
            >
              {modal &&
                <PhotoPreview
                  run={this.props.match.params.id}
                  venue={modal.id}
                  venueName={modal.name}
                  style={{ maxWidth: 'initial', maxHeight: 'initial' }}
                />}
            </Modal>

          </div>

        </div>;
  }
}

export default Run;
