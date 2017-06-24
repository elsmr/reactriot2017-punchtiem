import React from 'react';
import { Link } from 'react-router-dom';

const buttonStyle = {};

const Landing = ({ match }) => {
  return (
    <div>
      <Link to="/login" style={buttonStyle}>Login</Link>
      <Link to="register" style={buttonStyle}>Register</Link>
    </div>
  );
};

export default Landing;
