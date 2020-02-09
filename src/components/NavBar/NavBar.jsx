import React from 'react';
import { ReactComponent as LogoSmall } from '../../res/svg/Logo-small.svg';
import styles from './NavBar.module.scss';

/**
 * The site's nav bar
 * 
 * @param {String} title the page's title 
 */
const NavBar = (props) => {

    return (
        <div className={styles.navBar}>
            <svg viewBox="0, 0, 70, 10" className={styles.bgShape}>
                <polygon points="0,0 60,0 70,10 0,10"/>
            </svg>
            <h1>{props.title}</h1>
            <LogoSmall className={styles.logo}/>
        </div>
    );
}

export default NavBar;