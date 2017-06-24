import React from 'react';
import { Icon, Menu } from 'antd';

const Navigation = ({ auth, onClick }) =>
  <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    onClick={({ key }) => onClick(key)}
  >
<<<<<<< HEAD
    <Menu.Item key="home">
      <Icon type="home" />
      <span className="nav-text">Home</span>
    </Menu.Item>
    { auth &&
=======
    {auth &&
>>>>>>> e8c885162cdd04b321e12faa803c90e7acf6ce07
      <Menu.Item key="profile">
        <Icon type="user" />
        <span className="nav-text">Profile</span>
      </Menu.Item>}
    {auth &&
      <Menu.Item key="app">
        <Icon type="flag" />
<<<<<<< HEAD
        <span className="nav-text">Game</span>
      </Menu.Item>
    }
      <Menu.Item key="leaderboard">
        <Icon type="trophy" />
        <span className="nav-text">Leaderboard</span>
      </Menu.Item>
    { auth &&
=======
        <span className="nav-text">Run</span>
      </Menu.Item>}
    <Menu.Item key="leaderboard">
      <Icon type="trophy" />
      <span className="nav-text">Leaderboard</span>
    </Menu.Item>
    {!auth &&
      <Menu.Item key="login">
        <Icon type="login" />
        <span className="nav-text">Login</span>
      </Menu.Item>}
    {auth &&
>>>>>>> e8c885162cdd04b321e12faa803c90e7acf6ce07
      <Menu.Item key="logout">
        <Icon type="logout" />
        <span className="nav-text">Logout</span>
      </Menu.Item>}
  </Menu>;

export default Navigation;
