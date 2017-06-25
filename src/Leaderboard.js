import React, { Component } from 'react';
import { Table, Button } from 'antd';
import LoadingPage from './components/Loading';
import { ref } from './helpers/firebase';

class Leaderboard extends Component {
  state = {
    leaderboard: null
  }

  componentDidMount() {
    ref.child('runs')
      .orderByChild('points')
      .limitToLast(50)
      .once('value')
      .then(snapshot => {
        const leaderboard = [];
        snapshot.forEach(record => {
          const { points, name } = record.val();
          leaderboard.push({ key: record.key, run_id: record.key, points, name });
        });
        this.setState({ leaderboard: leaderboard.reverse() });
      });
  }

  getColumns() {
    const { history } = this.props;
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Points',
        dataIndex: 'points',
        key: 'points'
      },
      {
        title: 'Run',
        key: 'run',
        render: (text, record) =>
          <span>
            <Button
              icon="right-circle"
              onClick={() => history.push(`/run/${record.run_id}`)}
            />
          </span>
      }
    ];
  }

  render() {
    const { leaderboard } = this.state;

    return !leaderboard ? <LoadingPage /> : (
      <Table pagination={false} columns={this.getColumns()} dataSource={leaderboard} />
    );
  }
}

export default Leaderboard;
