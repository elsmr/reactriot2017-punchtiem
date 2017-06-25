import React, { Component } from 'react';
import { Timeline, Tag } from 'antd';
import InteractiveMap from './InteractiveMap';
import Loading from './Loading';
import { PRIMARY_COLOR } from '../constants';
import { getScore } from '../helpers/foursquare';

class Run extends Component {
  state = {
    venues: null,
    name: null,
    loading: true
  }

  componentWillMount() {
    const { match } = this.props;
  }

  render() {
    const { loading, name, venues } = this.state;
    return loading ? <Loading /> : <div>
          <InteractiveMap />
          <div style={{ margin: '2em' }}>
            <h1>Run by {name}</h1>
            <Timeline>
              {venues.map(venue =>
                <Timeline.Item key={venue.id}>
                  {venue.name} <Tag color={PRIMARY_COLOR}>{getScore(venue)}</Tag>
                </Timeline.Item>
              )}
            </Timeline>
          </div>
        </div>;
  }
}

export default Run;
