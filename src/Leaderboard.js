import React, { Component } from 'react';
import LoadingPage from './components/Loading';
import RunsTable from './components/RunsTable';
import { ref } from './helpers/firebase';

class Leaderboard extends Component {
  state = {
    leaderboard: null,
  };

  componentDidMount() {
    ref
      .child('runs')
      .orderByChild('points')
      .limitToLast(50)
      .once('value')
      .then(snapshot => {
        const leaderboard = [];
        snapshot.forEach(record => {
          const { points, name } = record.val();
          leaderboard.push({
            key: record.key,
            run_id: record.key,
            points,
            name,
          });
        });
        this.setState({ leaderboard: leaderboard.reverse() });
      });
  }

  render() {
    const { leaderboard } = this.state;
    const { history } = this.props;

    return !leaderboard
      ? <LoadingPage />
      : <RunsTable history={history} dataSource={leaderboard} />;
  }
}

export default Leaderboard;
