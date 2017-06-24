import React from 'react';
import { Button, Carousel, Timeline } from 'antd';
import { login } from './helpers/auth';

const wrapperStyle = {
  margin: '2em',
  textAlign: 'center'
};

const imageStyle = {
  width: '100%',
  height: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5em'
};

const Landing = ({ auth, history, onLogin }) => {
  return (
    <div style={wrapperStyle}>
      <h1>Monument Run</h1>
      <Carousel autoplay>
        <div style={imageStyle}><h3>Explore</h3></div>
        <div style={imageStyle}><h3>Challenge</h3></div>
        <div style={imageStyle}><h3>Exercise</h3></div>
      </Carousel>
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '2em 0' }}
      >
        <Timeline style={{ textAlign: 'left' }}>
          <Timeline.Item>Log in using your Google account</Timeline.Item>
          <Timeline.Item>Start your run</Timeline.Item>
          <Timeline.Item>
            Visit as many monuments as possible within the time limit
          </Timeline.Item>
          <Timeline.Item>
            Take pictures of the monuments you've visited
          </Timeline.Item>
          <Timeline.Item>Challenge everyone to beat your time!</Timeline.Item>
        </Timeline>
      </div>
      {!auth
        ? <Button
            type="primary"
            onClick={e => {
              login()
                .then(result => {
                  const { credential: { accessToken }, user } = result;
                  onLogin(accessToken, user);
                })
                .catch(error => {
                  this.setState({
                    loginError: 'Authentication with Google failed 😢'
                  });
                });
            }}
          >
            Login with Google
          </Button>
        : <Button type="primary" onClick={() => history.push('/app')}>
            Start your Monument Run
          </Button>}
    </div>
  );
};

export default Landing;
