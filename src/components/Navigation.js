import React from 'react';
import { logout } from '../helpers/auth';
import { Icon, Menu } from 'antd';

const Navigation = ({ auth, navigate, collapse }) => (
  <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    onClick={({ item, key, keyPath }) => {
      if (key === 'logout') {
        logout();
        navigate('/login');
      } else {
        navigate(`/${key}`);
      }
      collapse();
    }}
  >
    <Menu.Item key="profile">
      <Icon type="user" />
      <span className="nav-text">Profile</span>
    </Menu.Item>
    <Menu.Item key="app">
      <Icon type="flag" />
      <span className="nav-text">Game</span>
    </Menu.Item>
    <Menu.Item key="leaderboard">
      <Icon type="trophy" />
      <span className="nav-text">Leaderboard</span>
    </Menu.Item>
    <Menu.Item key="login">
      <Icon type="login" />
      <span className="nav-text">Login</span>
    </Menu.Item>
    <Menu.Item key="logout">
      <Icon type="logout" />
      <span className="nav-text">Logout</span>
    </Menu.Item>
  </Menu>
);

export default Navigation;
