import React from 'react';
import RecentPosts from '../../components/RecentPosts/RecentPosts';

const Root = () => (
    <>
    <header>
        <div className="banner">
            <img src="" alt="PureXForms"/>
            <div className="floaters" id="floaters-1" ></div>
            <div className="floaters" id="floaters-2" ></div>
            <div className="floaters" id="floaters-3" ></div>
            <div className="floaters" id="floaters-4" ></div>
        </div>
        <div className="triangles">
            <div className="triangle"></div>
            <div className="triangle"></div>
        </div>
    </header>
    <main>
        <RecentPosts/>
    </main>
    </>
);

export default Root;