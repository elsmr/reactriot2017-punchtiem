import React from 'react';
import { Table, Button } from 'antd';

const getColumns = (history, showName) => {
  const columns = [
    {
      title: 'Points',
      dataIndex: 'score',
      key: 'score',
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
  if (showName) {
    columns.unshift({ title: 'Name', dataIndex: 'name', key: 'name' });
  }
  return columns;
};

const RunsTable = ({ history, dataSource, showName = true }) =>
  <Table
    pagination={false}
    columns={getColumns(history, showName)}
    dataSource={dataSource}
  />;

export default RunsTable;
