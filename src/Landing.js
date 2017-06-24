import React from 'react';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

const wrapperStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const tropyStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  margin: '1.5em'
};

const Landing = ({ history }) => {
  return (
    <div style={wrapperStyle}>
      <Button
        size="large"
        icon="trophy"
        style={tropyStyle}
        onClick={() => history.push('/leaderbord')}
      />
      <ButtonGroup>
        <Button type="primary" onClick={() => history.push('/login')}>
          Login
        </Button>
        <Button type="secondary" onClick={() => history.push('/register')}>
          Register
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Landing;
