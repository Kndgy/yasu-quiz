import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import N5 from "./N5";
import N5test from './N5test';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={N5} />
        <Route exact path="/N5test" component={N5test} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
