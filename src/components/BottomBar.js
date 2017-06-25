import React from 'react';
import { Link } from 'react-router-dom';
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
  onUploaded,
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
      <Camera
        isNear={isNear}
        run={run}
        venue={closest}
        onUploaded={onUploaded}
      />
    </div>
    <Progress percent={progress} status="active" showInfo={false} />
  </footer>;

export default BottomBar;

const beforeRunStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const BeforeRun = ({ onStart }) =>
  <footer className="BottomBar" style={beforeRunStyle}>
    <p>
      Get ready to start your monument run{' '}
      <span role="img" aria-label="running dood">🏃🏽‍</span>
    </p>
    <p>You have 15 minutes to spot monuments</p>
    <p>Take a picture at each monument you're close to</p>
    <p>You get more points for more popular monuments</p>
    <Button onClick={onStart} style={{ margin: '1em' }}>Start</Button>
  </footer>;

export const AfterRun = ({ onStart, totalPoints, runId }) =>
  <footer className="BottomBar" style={beforeRunStyle}>
    <p>
      Congratulations <span role="img" aria-label="woo fucking hoo!">🎉</span>
    </p>
    <p>
      You won a whole {totalPoints} points{' '}
      <span role="img" aria-label="if you know what i mean"> 😏 🍆 </span>
    </p>
    <p>View the <Link to={`/run/${runId}`}>Run</Link> again</p>
    <Button onClick={onStart} style={{ margin: '1em' }}>Try again</Button>
  </footer>;
