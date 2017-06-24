import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { firebaseAuth } from './helpers/firebase';
import { Layout } from 'antd';

import Profile from './Profile';
import Landing from './Landing';
import Login from './Login';
import Foursquare from './Foursquare';
import Leaderboard from './Leaderboard';

import './App.css';

const { Header, Content } = Layout;

class App extends Component {
  state = {
    auth: false,
    loading: true,
    token: null,
    user: null
  };

  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          auth: true,
          loading: false,
          user,
          token: user.accessToken
        });
      } else {
        this.setState({
          auth: false,
          loading: false
        });
      }
    });
  }

  onLogin(token, user) {
    this.setState({ token, user });
  }

  render() {
    const { user, auth, loading } = this.state;
    return loading
      ? <div>Loading...</div>
      : <div>
          <Header style={{ position: 'fixed', width: '100%' }}>
            <span role="img" aria-label="MURICA" style={{ fontSize: 30 }}>
              🗽
            </span>
          </Header>
          <Content style={{ padding: '0 50px', paddingTop: 64 }}>
            <Router>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route
                  path="/login"
                  render={props =>
                    <Login {...props} onLogin={this.onLogin.bind(this)} />}
                />
                <Route exact path="/fsq" component={Foursquare} />
                <Route path="/leaderbord" component={Leaderboard} />
                <PrivateRoute
                  auth={auth}
                  path="/profile"
                  render={props => <Profile {...props} user={user} />}
                />
              </Switch>
            </Router>
          </Content>
        </div>;
  }
}

export default App;
