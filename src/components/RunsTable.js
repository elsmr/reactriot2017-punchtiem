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

const RunsTable = ({ history, dataSource, showName = true }) => (
  <Table pagination={false} columns={getColumns(history)} dataSource={dataSource} />
);

export default RunsTable;
