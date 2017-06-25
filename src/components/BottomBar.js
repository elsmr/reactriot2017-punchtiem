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
      fontSize: '16px',
      transform: `rotate(${Math.round(rotation)}rad)`,
    }}
  >
    <Icon type="arrow-up" />
  </div>;

const Closest = ({ name, categories, score, distance, heading }) =>
  <div className="Closest">
    <div className="Closest--top">
      <Tag color={PRIMARY_COLOR}>{score || 0}p</Tag>
      <h2 className="Closest--name">
        {name || 'No nearby places found 😢'}
      </h2>

    </div>
    <div className="Closest--details">
      <Heading rotation={heading} />
      <span className="seperator">&middot;</span>
      <div>{distance || 0}m away</div>
      {categories && <span className="seperator">&middot;</span>}
      {categories && <div>{categories[0].name}</div>}
    </div>
  </div>;

const BottomBar = ({
  run = 'bla-bla-bla',
  progress = 0,
  isNear = false,
  speed = null,
  visited = 0,
  total = 10,
  closest,
  onUploaded,
}) =>
  <footer className="BottomBar">
    <div className="BottomBar--inner">
      <div className="BottomBar--main">
        <Closest {...closest} />
        <div className="BottomBar--details">
          {speed &&
            <div>
              <Icon type="double-right" />
              <span>{speed} m/s</span>
            </div>}
          <div>
            {visited} Monuments visited
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
    <p>Some monuments score more than others!</p>
    <Button onClick={onStart} style={{ margin: '1em' }}>Start</Button>
  </footer>;

export const AfterRun = ({ onStart, totalPoints, runId }) =>
  <footer className="BottomBar" style={beforeRunStyle}>
    <p>
      Congratulations <span role="img" aria-label="woo fucking hoo!">🎉</span>
    </p>
    <p>
      You got a score of {totalPoints} points{' '}
      <span role="img" aria-label="if you know what i mean"> 😏 🍆 </span>
    </p>
    <p>View the <Link to={`/run/${runId}`}>Run</Link> again</p>
    <Button onClick={onStart} style={{ margin: '1em' }}>Try again</Button>
  </footer>;
