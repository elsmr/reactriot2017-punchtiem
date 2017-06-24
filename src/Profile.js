import React from 'react';
import User from './components/User';
import Run from './components/Run';

const Profile = ({ user, runs }) =>
  <div>
    <User {...user} />
    <ul>
      {runs.map(run => <Run key={run.id} {...run} />)}
    </ul>
  </div>;

export default Profile;
