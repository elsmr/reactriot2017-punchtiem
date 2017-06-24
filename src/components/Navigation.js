import React from 'react';
import { Icon, Menu } from 'antd';

const Navigation = ({ auth, onClick }) =>
  <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    onClick={({ key }) => onClick(key)}
  >
    <Menu.Item key="home">
      <Icon type="home" />
      <span className="nav-text">Home</span>
    </Menu.Item>
    { auth &&
      <Menu.Item key="profile">
        <Icon type="user" />
        <span className="nav-text">Profile</span>
      </Menu.Item>
    }
    { auth &&
      <Menu.Item key="app">
        <Icon type="flag" />
        <span className="nav-text">Game</span>
      </Menu.Item>
    }
      <Menu.Item key="leaderboard">
        <Icon type="trophy" />
        <span className="nav-text">Leaderboard</span>
      </Menu.Item>
    { auth &&
      <Menu.Item key="logout">
        <Icon type="logout" />
        <span className="nav-text">Logout</span>
      </Menu.Item>
    }
  </Menu>;

export default Navigation;
