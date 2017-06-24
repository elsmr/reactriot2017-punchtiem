import React from 'react';
import { Spin } from 'antd';

const Loading = () =>
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      margin: '2em',
    }}
  >
    <Spin size="large"></Spin>
  </div>;

export default Loading;
