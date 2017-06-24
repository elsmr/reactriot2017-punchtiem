import React from 'react';
import { Progress, Button, Icon, Tag } from 'antd';
import './BottomBar.css';

const Camera = ({ isNear }) =>
  <div className="BottomBar--photo">
    {isNear ? 'take photo' : 'get closer'}
    <input
      type="file"
      accept="image/*"
      ref={input => {
        this.cameraInput = input;
      }}
      disabled={!isNear}
    />
    <Button
      shape="circle"
      icon="camera"
      size="large"
      onClick={() => this.cameraInput.click()}
      disabled={!isNear}
    />
  </div>;

const Heading = ({ rotation }) => <Icon type="arrow-up" spin />;

const Closest = ({ name, score, distance, heading }) =>
  <div className="Closest">
    <div className="Closest--top">
      <strong className="Closest--name">{name}</strong>
      <Tag color="red">{score}</Tag>
    </div>
    <div>
      <div>{distance}</div>
      <Heading rotation={heading} />
    </div>
  </div>;

const BottomBar = ({ progress, isNear, speed = 0, visited = 0, total = 10 }) =>
  <footer className="BottomBar">
    <div className="BottomBar--inner">
      <div className="BottomBar--main">
        <Closest
          name="Trafalgar Square"
          score="200"
          distance="200m"
          heading={20}
        />
        <div>
          <div>
            {speed} km/h
          </div>
          <div>
            {visited}/{total}
          </div>
        </div>
      </div>
      <Camera isNear={isNear} />
    </div>
    <Progress percent={progress} status="active" showInfo={false} />
  </footer>;

export default BottomBar;
