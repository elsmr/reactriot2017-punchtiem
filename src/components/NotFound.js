import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () =>
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 64px)',
      padding: '1em',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1>Very sad, but this page does not exist</h1>
    <p style={{ margin: '1em' }}>
      Go quickly <span role="img" aria-label="run very fast">🏃🏿</span> to{' '}
      <Link to="/"><span role="img" aria-label="home">🏡</span></Link>
    </p>
  </div>;

export default NotFound;
