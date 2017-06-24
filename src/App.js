import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import { firebaseAuth } from './helpers/firebase';
import { Layout, Icon } from 'antd';

import { logout } from './helpers/auth';

import Profile from './Profile';
import Landing from './Landing';
import Login from './Login';
import Map from './Map';
import Leaderboard from './Leaderboard';

import './App.css';

const { Sider, Header, Content } = Layout;

class App extends Component {
  state = {
    auth: false,
    loading: true,
    token: null,
    user: null,
    collapsed: true,
    currentPage: 'Login'
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
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

  history = createHistory(this.props);

  render() {
    const { user, auth, loading } = this.state;
    return loading
      ? <Loading />
      : <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            collapsible
            trigger={null}
            collapsed={this.state.collapsed}
            style={{ backgroundColor: '#FFF' }}
          >
            <div className="logo" />
            <Navigation
              auth={auth}
              onClick={key => {
                ({ item, key, keyPath }) => {
                  if (key === 'logout') {
                    logout();
                    this.history.push('/login');
                  } else {
                    this.history.push(`/${key}`);
                  }
                  this.setState({
                    collapsed: true,
                    currentPage: key[0].toUpperCase() + key.slice(1)
                  });
                };
              }}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                backgroundColor: '#FFF',
                position: 'fixed',
                width: '100%'
              }}
            >
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              Monument Run
            </Header>
            <Content style={{ marginTop: 64, minHeight: 'calc(100vh - 64px)' }}>
              <Router history={this.history}>
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route
                    path="/login"
                    render={props =>
                      <Login {...props} onLogin={this.onLogin.bind(this)} />}
                  />
                  <Route exact path="/app" component={Map} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <PrivateRoute
                    auth={auth}
                    path="/profile"
                    render={props =>
                      <Profile
                        {...props}
                        user={user}
                        runs={[{ id: 'k', score: 4 }] /* add runs */}
                      />}
                  />
                </Switch>
              </Router>
            </Content>
          </Layout>
        </Layout>;
  }
}

export default App;
