import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.scss';
import Root from './routes/Root/Root';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Root/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
