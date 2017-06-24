import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';
import { firebaseAuth } from './helpers/firebase';
import { Layout, Menu, Icon } from 'antd';

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
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          auth: true,
          loading: false,
          user,
          token: user.accessToken,
        });
      } else {
        this.setState({
          auth: false,
          loading: false,
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
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              onClick={({ item, key, keyPath }) => this.history.push(`/${key}`)}
            >
              <Menu.Item key="profile">
                <Icon type="user" />
                <span className="nav-text">Profile</span>
              </Menu.Item>
              <Menu.Item key="fsq">
                <Icon type="flag" />
                <span className="nav-text">Game</span>
              </Menu.Item>
              <Menu.Item key="leaderbord">
                <Icon type="trophy" />
                <span className="nav-text">Leaderboard</span>
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
