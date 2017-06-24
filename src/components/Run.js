import React from 'react';
import { Timeline } from 'antd';

const data = [
  { location: 'Memexd' },
  { location: 'nog een meme xd' },
  { location: 'oops nog één!!!!' }
];

const Run = ({ match }) => {
  return (
    <div>
      <div style={{ backgroundColor: 'grey', height: '60vh' }}>Map</div>
      <div style={{ margin: '2em' }}>
        <Timeline>
          {data.map(item =>
            <Timeline.Item key={item.location}>{item.location}</Timeline.Item>
          )}
        </Timeline>
      </div>
    </div>
  );
};

export default Run;
