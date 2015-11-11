// Imports

import 'velocity-animate'
import 'velocity-animate/velocity.ui'

import React    from 'react';
import ReactDOM from 'react-dom';

import {
  Router,
  Route,
} from 'react-router'

import Application  from './components/application'

// Routes

ReactDOM.render(
  <Router>
    <Route name='app' path='/' component={Application} />
  </Router>,
  document.getElementById('container')
)
