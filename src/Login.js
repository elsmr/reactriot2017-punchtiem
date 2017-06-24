import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { login } from './helpers/auth';

const wrapperStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default class Login extends Component {
  state = { loginError: null };

  handleClick = e => {
    const { onLogin, history } = this.props;
    login()
      .then(result => {
        const { credential: { accessToken }, user } = result;
        onLogin(accessToken, user);
        history.push('/profile');
      })
      .catch(error => {
        this.setState({ loginError: 'Authentication with Google failed 😢' });
      });
  };

  render() {
    const { loginError } = this.state;
    const { auth } = this.props;
    return auth ? <Redirect to="/" /> : (
      <div style={wrapperStyle}>
        <Button onClick={e => this.handleClick(e)}>
          Login with Google
        </Button>
        {loginError && <p>Error: {loginError}</p>}
      </div>
    );
  }
}
