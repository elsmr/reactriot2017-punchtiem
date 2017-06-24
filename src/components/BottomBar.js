import React from 'react';
import { Progress, Icon, Tag } from 'antd';
import Camera from './Camera';
import './BottomBar.css';

const Heading = ({ rotation }) => <Icon type="arrow-up" spin />;

const Closest = ({ name, score, distance, heading }) =>
  <div className="Closest">
    <div className="Closest--top">
      <strong className="Closest--name">{name}</strong>
      <Tag color="red">{score}</Tag>
    </div>
    <div>
      <div>{distance}m</div>
      <Heading rotation={heading} />
    </div>
  </div>;

const BottomBar = ({
  run = 'bla-bla-bla',
  progress = 0,
  isNear = false,
  speed = 0,
  visited = 0,
  total = 10,
  closest = {
    id: 'qslmfjqslmfkjqsmlkfj',
    name: 'Trafalgar Square',
    score: 200,
    distance: 223,
    heading: 10,
  },
}) =>
  <footer className="BottomBar">
    <div className="BottomBar--inner">
      <div className="BottomBar--main">
        <Closest {...closest} />
        <div>
          <div>
            {speed} km/h
          </div>
          <div>
            {visited}/{total}
          </div>
        </div>
      </div>
      <Camera isNear={isNear} run={run} venue={closest} />
    </div>
    <Progress percent={progress} status="active" showInfo={false} />
  </footer>;

export default BottomBar;
