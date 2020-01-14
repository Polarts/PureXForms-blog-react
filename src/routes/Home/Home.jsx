import React from 'react';
import RecentPosts from '../../components/RecentPosts/RecentPosts';
import ParallaxScene from '../../components/ParallaxScene/ParallaxScene';
import styles from './Home.module.scss';
import { ReactComponent as Logo } from '../../res/svg/Logo.svg';

const Home = () => (
    <>
    <header>
        <ParallaxScene>
            <Logo className={styles.logo} data-depth="0.5"/>
            <div className={styles.floaters1} data-depth="0.1"></div>
            <div className={styles.floaters2} data-depth="0.2"></div>
            <div className={styles.floaters3} data-depth="0.3"></div>
            <div className={styles.floaters4} data-depth="0.4"></div>
        </ParallaxScene>
        <div className={styles.triangles}>
            <div className="shape triangle left"></div>
            <div className="shape triangle right"></div>
        </div>
    </header>
    <main>
        <RecentPosts/>
    </main>
    </>
);

export default Home;