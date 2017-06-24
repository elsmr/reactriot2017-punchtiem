import React from 'react';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

const wrapperStyle = {
  height: 'calc(100vh - 64px)',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const tropyStyle = {
  position: 'relative',
  top: 0,
  right: 0,
  margin: '1.5em'
};

const Landing = ({ history }) => {
  return (
    <div style={wrapperStyle}>
      <Button type="primary" onClick={() => history.push('/login')}>
        Login
      </Button>
      <Button
        size="large"
        icon="trophy"
        style={tropyStyle}
        onClick={() => history.push('/leaderbord')}
      />
    </div>
  );
};

export default Landing;
