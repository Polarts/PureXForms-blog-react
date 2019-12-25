import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import PostPreview from './components/PostPreview/PostPreview';
import wpClient from './services/wordpress';


function App() {

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    wpClient.getPosts({}, ["title", "excerpt", "terms", "date"], (err, psts) => {
      console.log(psts);
      setPosts(psts);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100vw"}}>
          {posts.map(p => <PostPreview title={p.title}
                                      previewImgUrl="http://assets.stickpng.com/thumbs/5cb0633d80f2cf201a4c3253.png"
                                      excerpt={p.excerpt}
                                      date={p.date}
                                      tags={p.terms.map(t => t.name)}/>)}
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
