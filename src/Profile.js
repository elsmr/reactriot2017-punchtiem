import React from 'react';
import { Table, Button } from 'antd';

import User from './components/User';

const getColumns = history => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
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
        </span>,
    },
  ];
};

const data = [
  {
    key: '6969',
    run_id: '69',
    name: 'John 69',
    time: '15\'69"',
  },
  {
    key: '96',
    run_id: '88',
    name: 'Jim 69',
    time: '15\'69"',
  },
  {
    key: '69',
    run_id: '96',
    name: 'Joe 60',
    time: '15\'69"',
  },
];

const Profile = ({ user, history }) =>
  <div>
    <User {...user} />
    <Table pagination={false} columns={getColumns(history)} dataSource={data} />
  </div>;

export default Profile;
