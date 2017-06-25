import React, { Component } from 'react';
import { ref } from './helpers/firebase';
import RunsTable from './components/RunsTable';
import LoadingPage from './components/LoadingPage';

import User from './components/User';

class Profile extends Component {
  state = {
    runs: null,
    loading: true,
  };

  componentDidMount() {
    const { user } = this.props;

    ref.child(`users/${user.uid}/runs`).once('value').then(snapshot => {
      const data = snapshot.val() || {};
      const runs = Object.keys(data).map(runId => ({
        key: runId,
        run_id: runId,
        score: data[runId].score,
        date: new Date(data[runId].date).toDateString(),
      }));
      this.setState({ runs: runs.reverse(), loading: false });
    });
  }

  render() {
    const { user, history, onLogout } = this.props;
    const { runs, loading } = this.state;

    return loading
      ? <LoadingPage />
      : <div>
          <User {...user} onLogout={onLogout} />
          {runs.length > 0 &&
            <h2 style={{ margin: '1em' }}>
              {user.displayName}'s Runs
            </h2>}
          {runs.length > 0 &&
            <RunsTable history={history} dataSource={runs} showName={false} />}
          {!runs.length &&
            <div
              style={{
                display: 'flex',
                height: 'calc(100vh - 200px)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div>
                You have not made any runs yet{' '}
                <span role="img" aria-label="that's actually quite sad">
                  😢
                </span>
              </div>
            </div>}
        </div>;
  }
}

export default Profile;
