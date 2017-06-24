import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Leaderbord from './Leaderbord';
import Foursquare from './Foursquare';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/leaderbord" component={Leaderbord} />
          <Route exact path="/fsq" component={Foursquare} />
        </div>
      </Router>
    );
  }
}

export default App;
