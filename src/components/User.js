import React from 'react';
import { Avatar } from 'antd';
import { CLOUDINARY } from '../constants';
import './User.css';

const User = ({ displayName, email, photoURL }) => {
  return (
    <div className="User">
      <div>
        {`${displayName} (${email})`}
      </div>
      <Avatar src={`${CLOUDINARY}${photoURL}`} />
    </div>
  );
};

export default User;
