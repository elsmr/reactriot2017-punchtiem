import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './Landing';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Landing} />
      </Router>
    );
  }
}

export default App;
