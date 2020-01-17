import styles from './Home.module.scss';
import React from 'react';
import { ReactComponent as Logo } from '../../res/svg/Logo.svg';
import Icon from '@mdi/react'
import { mdiAccountCircle, mdiWeb, mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import RecentPosts from '../../components/RecentPosts/RecentPosts';
import ParallaxScene from '../../components/ParallaxScene/ParallaxScene';
import SloganRandomizer from '../../components/SloganRandomizer/SloganRandomizer';
import IconLink from '../../components/IconLink/IconLink';

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
            <svg viewBox="0, 0, 300, 120">
                <polygon points="0,0 0,120 300,120"/>
            </svg>
            <svg viewBox="0, 0, 300, 120">
                <polygon points="0,120 300,120 300,0"/>
            </svg>
        </div>
    </header>
    <main>
        <div className={styles.sloganAndNav}>
            <IconLink 
                label="About Blog"
                link="/about-blog"
                icon={mdiWeb}
                direction="left"
            />
            <SloganRandomizer/>
            <IconLink
                label="About Author"
                link="/about-author"
                icon={mdiAccountCircle}
                direction="right"
            />
        </div>
        <RecentPosts/>
    </main>
    </>
);

export default Home;