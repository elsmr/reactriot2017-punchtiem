import React from 'react';
import { Progress, Icon, Tag, Button } from 'antd';
import { PRIMARY_COLOR } from '../constants';
import Camera from './Camera';
import './BottomBar.css';

const Heading = ({ rotation }) =>
  <div
    style={{
      display: 'inline-block',
      transform: `rotate(${Math.round(rotation)}rad)`,
    }}
  >
    <Icon type="arrow-up" />
  </div>;

const Closest = ({ name, score, distance, heading }) =>
  <div className="Closest">
    <div className="Closest--top">
      <strong className="Closest--name">{name}</strong>
      <Tag color={PRIMARY_COLOR}>{score}</Tag>
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
            {speed ? `${speed} m/s ` : null}
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

export const BeforeRun = ({ onStart }) =>
  <footer className="BottomBar">
    <Button onClick={onStart}>Start</Button>
  </footer>;

export const AfterRun = ({ onStart }) =>
  <footer className="BottomBar">
    <Button onClick={onStart}>Restart</Button>
  </footer>;
