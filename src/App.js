import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import RecentPosts from './components/RecentPosts/RecentPosts';


function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100vw"}}>
        <RecentPosts/>  
        </div>
        <p>
          Edit <code>react-src/src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
