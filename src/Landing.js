import React, { Component } from 'react';
import { Button, Carousel, Timeline, message } from 'antd';
import { login } from './helpers/auth';

const wrapperStyle = {
  margin: '2em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '60vh',
};

const imageStyle = {
  width: '100%',
  height: '30vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5em',
  color: '#fff',
  objectFit: 'cover',
};

const headerStyle = {
  textShadow: '2px 2px rgba(0,0,20,100)',
};

const LoginButton = ({ provider, onLogin }) =>
  <Button
    type="primary"
    style={{ margin: '1em' }}
    onClick={e => {
      login(provider)
        .then(result => {
          const { credential: { accessToken }, user } = result;
          onLogin(accessToken, user);
        })
        .catch(error => {
          console.warn(error);
          message.error(
            <span>
              Authentication with {provider} failed{' '}
              <span role="img" aria-label="very very sad">😢</span>,
              please try again
            </span>,
            3
          );
        });
    }}
  >
    Login with {provider}
  </Button>;

const Login = ({ onLogin }) =>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <LoginButton provider="Google" onLogin={onLogin} />
    <LoginButton provider="GitHub" onLogin={onLogin} />
  </div>;

export default class Landing extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.addEventListener('load', () =>
      window.HACKBIT_VOTING_WIDGET.render(this.widget)
    );
    script.src =
      'https://www.reactriot.com/entries/3-punchtiem/vote.js?manual=true';
    script.async = true;
    document.body.appendChild(script);
  }

  componentDidUpdate() {
    // idk why we need a timeout but we do wtf kill me now
    // ant fixes the carousel when resize event is fired
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  render() {
    const { auth, history, onLogin } = this.props;
    return (
      <div>
        <h1 className="structural">Monument Run</h1>
        <Carousel>
          <div
            style={{
              ...imageStyle,
              backgroundImage: `url(https://images.unsplash.com/36/xIsiRLngSRWN02yA2BbK_submission-photo-7.jpg?dpr=1&auto=format&fit=crop&w=${window.innerWidth}&q=80&cs=tinysrgb&crop=&bg=)`,
            }}
          >
            <h2 style={headerStyle}>Explore</h2>
          </div>
          <div
            style={{
              ...imageStyle,
              backgroundImage: `url(https://images.unsplash.com/photo-1482401204742-eb3c31c24722?dpr=1&auto=compress,format&fit=crop&w=${window.innerWidth}&q=80&cs=tinysrgb&crop=&bg=)`,
            }}
          >
            <h2 style={headerStyle}>Challenge</h2>
          </div>
          <div
            style={{
              ...imageStyle,
              backgroundImage: `url(https://images.unsplash.com/photo-1487956382158-bb926046304a?dpr=1&auto=compress,format&fit=crop&w=${window.innerWidth}&q=80&cs=tinysrgb&crop=&bg=)`,
            }}
          >
            <h2 style={headerStyle}>Exercise</h2>
          </div>
        </Carousel>
        <div style={wrapperStyle}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Timeline style={{ textAlign: 'left' }}>
              <Timeline.Item>
                Log in using your Google or GitHub account
              </Timeline.Item>
              <Timeline.Item>Start your run</Timeline.Item>
              <Timeline.Item>
                Visit as many monuments as possible within the time limit
              </Timeline.Item>
              <Timeline.Item>
                Take pictures of the monuments you've visited
              </Timeline.Item>
              <Timeline.Item>
                Challenge everyone to beat your time!
              </Timeline.Item>
            </Timeline>
            {!auth
              ? <Login onLogin={onLogin} />
              : <Button type="primary" onClick={() => history.push('/app')}>
                  Start your Monument Run
                </Button>}
          </div>
          <section className="Landing-info">
            <h3>Info</h3>
            <p>
              This app is made by{' '}
              <a href="https://eliasmei.re">
                Elias Meire
              </a>,{' '}
              <a href="https://haroen.me">Haroen Viaene</a> and{' '}
              <a href="https://weyts.xyz">
                Arnaud Weyts
              </a>. It's part of{' '}
              <a href="reactriot.com">React Riot</a> 2017.
            </p>
            <p>
              The monument data is available on the{' '}
              <a href="https://developer.foursquare.com/">
                Foursquare
              </a>{' '}
              API.
            </p>
            <p>
              This is an open source project,{' '}
              <a href="https://github.com/Hackbit/reactriot2017-punchtiem">
                source code
              </a>
            </p>
          </section>
        </div>
        <div
          className="voting-widget"
          ref={widget => {
            this.widget = widget;
          }}
        />
      </div>
    );
  }
}
