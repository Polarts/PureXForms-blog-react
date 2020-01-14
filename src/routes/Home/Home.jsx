import React from 'react';
import RecentPosts from '../../components/RecentPosts/RecentPosts';
import ParallaxScene from '../../components/ParallaxScene/ParallaxScene';
import styles from './Home.module.scss';

const Home = () => (
    <>
    <header>
        <ParallaxScene className="banner">
            <img src={require('../../res/img/Logo.svg')} alt="PureXForms" data-depth="0.5"/>
            <div className="floaters" id="floaters-1" data-depth="0.1"></div>
            <div className="floaters" id="floaters-2" data-depth="0.2"></div>
            <div className="floaters" id="floaters-3" data-depth="0.3"></div>
            <div className="floaters" id="floaters-4" data-depth="0.4"></div>
        </ParallaxScene>
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

export default Home;