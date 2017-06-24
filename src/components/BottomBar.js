import React from 'react';
import { Progress, Button } from 'antd';
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
      onClick={() => this.cameraInput.click()}
      disabled={!isNear}
    />
  </div>;

const BottomBar = ({ progress, isNear }) =>
  <footer className="BottomBar">
    <div className="BottomBar--inner">
      <Camera isNear={isNear} />
    </div>
    <Progress percent={progress} status="active" showInfo={false} />
  </footer>;

export default BottomBar;
