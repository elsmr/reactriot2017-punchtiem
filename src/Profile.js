import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <div>
        {`${user.displayName} (${user.email})`}
      </div>
      <div>
        <img src={user.photoURL} alt={`${user.displayName}`}/>
      </div>
    </div>
  );
};

export default Profile;
