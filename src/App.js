import './stylesheets/global.scss';
import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './routes/Home/Home';
import Post from './routes/Post/Post';

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

        <Route exact path="/:slug">
          <Post/>
        </Route>

        <Route exact path="/post/:slug">
          <Post/>
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
