import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'typeface-roboto';

import Landing from './Landing';
import Xchg from './Xchg';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:uuid" component={Xchg} />
      </Switch>
    </Router>
  );
}
