import React from 'react';
import Menu from './components/Menu';
import Labels from './components/Labels';
import Filters from './components/Filters';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/" exact component={Filters} />
        <Route path="/labels" exact component={Labels} />
        {/* <Route path="/about" exact component={Errir} /> */}
      </Switch>
    </>
  );
}

export default App;
