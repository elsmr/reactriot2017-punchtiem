import React from 'react';
import { Avatar, Button } from 'antd';
import { CLOUDINARY } from '../constants';
import './User.css';

const User = ({ displayName, email, photoURL, onLogout }) => {
  return (
    <div className="User">
      <div className="User__details">
        <Avatar src={`${CLOUDINARY}${photoURL}`} />
        <div className="User__info">
          <div className="User__displayName">{displayName}</div>
          <div className="User__email">{email}</div>
        </div>
      </div>
      <Button type="primary" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

export default User;
