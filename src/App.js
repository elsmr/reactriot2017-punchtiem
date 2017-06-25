import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './components/PrivateRoute';
import LoadingPage from './components/Loading';
import Navigation from './components/Navigation';
import { firebaseAuth } from './helpers/firebase';
import { Layout, Icon, Avatar, Tooltip, message } from 'antd';

import { logout } from './helpers/auth';
import { PAGE_TITLES } from './constants';

import Profile from './Profile';
import Landing from './Landing';
import Map from './Map';
import Leaderboard from './Leaderboard';
import Run from './components/Run';

import './App.css';

const { Sider, Header, Content } = Layout;

const topBarStyle = {
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
};

const profileStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
};

class App extends Component {
  state = {
    auth: false,
    loading: true,
    token: null,
    user: null,
    collapsed: true,
    currentPage: PAGE_TITLES.default
  };

  history = createHistory(this.props);

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentWillMount() {
    this.setState({
      currentPage:
        PAGE_TITLES[window.location.pathname.split('/')[1]] ||
          PAGE_TITLES.default
    });
  }

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
          loading: false,
          user: null,
          token: null
        });
      }
    });
  }

  onLogin(token, user) {
    this.setState({ token, user });
  }

  render() {
    const { startTracking, stopTracking, startTimer, stopTimer, runState } = this.props;
    const { user, auth, loading } = this.state;
    return loading
      ? <LoadingPage />
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
                if (key === 'logout') {
                  logout();
                  message.success(<span>Logged out successfully</span>, 3);
                  this.history.push('/');
                } else if (key === 'home') {
                  this.history.push(`/`);
                } else {
                  this.history.push(`/${key}`);
                }
                this.setState({
                  collapsed: true,
                  currentPage: PAGE_TITLES[key] || PAGE_TITLES.default
                });
              }}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                backgroundColor: '#FFF',
                position: 'fixed',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                zIndex: 100
              }}
            >
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div style={topBarStyle}>
                <span style={{ marginLeft: '2.5em' }}>
                  {this.state.currentPage}
                </span>
                {auth &&
                  user &&
                  <Tooltip title="Show your profile" placement="bottomRight">
                    <div
                      style={profileStyle}
                      onClick={() => this.history.push('/profile')}
                    >
                      <Avatar
                        style={{ marginRight: '.5em' }}
                        src={user.photoURL}
                      />
                      <span>{user.displayName}</span>
                    </div>
                  </Tooltip>}
              </div>
            </Header>
            <Content style={{ marginTop: 64, minHeight: 'calc(100vh - 64px)' }}>
              <Router history={this.history}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props =>
                      <Landing
                        {...props}
                        resize={this.state.collapsed}
                        auth={auth}
                        onLogin={this.onLogin.bind(this)}
                      />}
                  />
                  <Route
                    exact
                    path="/app"
                    render={() =>
                      <Map
                        startTracking={startTracking}
                        stopTracking={stopTracking}
                        startTimer={startTimer}
                        stopTimer={stopTimer}
                        runState={runState}
                        totalS={20 /*todo: make 15 min*/}
                      />}
                  />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/run/:id" component={Run} />
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
