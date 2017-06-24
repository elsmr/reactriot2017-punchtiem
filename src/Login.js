import React, { Component } from 'react';
import { login } from './helpers/auth';

export default class Login extends Component {
  state = { loginError: null }

  handleClick = (e) => {
    const { onLogin } = this.props;
    login()
      .then((result) => {
        const { credential: { accessToken }, user } = result;
        onLogin(accessToken, user);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loginError: 'Authentication with Google failed 😢' });
      })
  }

  render () {
    const { loginError } = this.state;
    return (
      <div>
        <button onClick={e => this.handleClick(e)}>Login with Google</button>
        { loginError &&
          <p>Error: {loginError}</p>
        }
      </div>
    )
  }
}
