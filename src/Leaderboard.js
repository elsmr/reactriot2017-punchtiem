import React, { Component } from 'react';
import { Table, Button } from 'antd';
import Loading from './components/Loading';
import { ref } from './helpers/firebase';

class Leaderboard extends Component {
  state = {
    leaderboard: null
  }

  componentDidMount() {
    ref.child('runs')
      .orderByChild('score')
      .limitToFirst(20)
      .once('value')
      .then(snapshot => {
        this.setState({ leaderboard: snapshot });
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
        title: 'Score',
        dataIndex: 'score',
        key: 'score'
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

    return !leaderboard ? <Loading /> : (
      <Table pagination={false} columns={this.getColumns()} dataSource={leaderboard} />
    );
  }
}

export default Leaderboard;
