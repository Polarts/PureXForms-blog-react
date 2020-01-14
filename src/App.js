import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './routes/Home/Home';
import './stylesheets/global.scss';

function App() {

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/">
          <Home/>
        </Route>

        <Route exact path="/about-author">
          <h1>About Author</h1>
        </Route>

        <Route exact path="/about-blog">
          <h1>About Blog</h1>
        </Route>

        <Route exact path="/post/:slug">
          <h1>Post!</h1>
        </Route>

        <Route exact path="*">
          <div>
            Not found!
          </div>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
