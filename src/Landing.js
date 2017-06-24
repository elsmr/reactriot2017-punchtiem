import React from 'react';
import Button from 'antd/lib/button';

const ButtonGroup = Button.Group;

const wrapperStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const Landing = ({ history }) => {
  return (
    <div style={wrapperStyle}>
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
