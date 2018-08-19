import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import 'typeface-roboto';

import { getHistory } from './actions';
import Landing from './Landing';
import Xchg from './Xchg';

function App(props) {
  return (
    <Router history={props.getHistory()}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:uuid" component={Xchg} />
      </Switch>
    </Router>
  );
}
App.propTypes = {
  getHistory: PropTypes.func.isRequired,
};

export default connect(null, { getHistory })(App);
