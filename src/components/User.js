import React from 'react';
import { Avatar } from 'antd';
import './User.css';

const User = ({ displayName, email, photoURL }) => {
  return (
    <div className="User">
      <div>
        {`${displayName} (${email})`}
      </div>
      <Avatar src={photoURL} />
    </div>
  );
};

export default User;
