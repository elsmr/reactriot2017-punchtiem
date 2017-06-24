import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { firebaseAuth } from './helpers/firebase';
import { Layout, Menu, Icon } from 'antd';

import Profile from './Profile';
import Landing from './Landing';
import Login from './Login';
import Foursquare from './Foursquare';
import Leaderboard from './Leaderboard';

import './App.css';

const { Sider, Header, Content } = Layout;

class App extends Component {
  state = {
    auth: false,
    loading: true,
    token: null,
    user: null,
    collapsed: true
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

  render() {
    const { user, auth, loading } = this.state;
    return loading
      ? <div>Loading...</div>
      : <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="nav-text">nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">nav 3</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">nav 4</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ position: 'fixed', width: '100%' }}>
              <Icon
                className="trigger"
                style={{ color: '#FFF' }}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ marginTop: 64 }}>
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
          </Layout>
        </Layout>;
  }
}

export default App;
