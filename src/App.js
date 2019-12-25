import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostPreview from './components/PostPreview/PostPreview';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PostPreview title="Some Post" 
                     previewImgUrl="http://assets.stickpng.com/thumbs/5cb0633d80f2cf201a4c3253.png"
                     excerpt="this is some post i just made up to make you feel oh so special my dude"
                     tags={["CS", "XAML"]}
                     date={"01-01-2020"}
                     />
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
