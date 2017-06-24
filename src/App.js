import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Foursquare from './Foursquare';
import Leaderboard from './Leaderboard';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/fsq" component={Foursquare} />
          <Route path="/leaderbord" component={Leaderboard} />
        </div>
      </Router>
    );
  }
}

export default App;
