import React from 'react';
import { Table, Button } from 'antd';

const getColumns = history => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time'
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
};

const data = [
  {
    key: '1',
    run_id: '69',
    name: 'John Brown',
    time: '15\'05"'
  },
  {
    key: '2',
    run_id: '88',
    name: 'Jim Green',
    time: '15\'05"'
  },
  {
    key: '3',
    run_id: '96',
    name: 'Joe Black',
    time: '15\'05"'
  }
];

const Leaderboard = ({ history }) => {
  return (
    <Table pagination={false} columns={getColumns(history)} dataSource={data} />
  );
};

export default Leaderboard;
