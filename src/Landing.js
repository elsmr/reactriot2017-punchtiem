import React from 'react';
import { Button } from 'antd';
import { login } from './helpers/auth';

const wrapperStyle = {
  height: 'calc(100vh - 64px)',
  width: '100%',
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

const Landing = ({ auth, history, onLogin }) => {
  return <div style={wrapperStyle}>
      {!auth &&
        <Button type="primary" onClick={e => {
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
        }}>
          Login with Google
      </Button>
      }

      <Button size="large" icon="trophy" style={tropyStyle} onClick={() => history.push('/leaderbord')} />
    </div>;
};

export default Landing;
