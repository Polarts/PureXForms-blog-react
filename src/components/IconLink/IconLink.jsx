import styles from './IconLink.module.scss';
import React from 'react';
import Icon from '@mdi/react';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import { Link } from 'react-router-dom';

/**
 * An icon followed by text below, which links to an address. 
 * 
 * @param {String} label the text below the icon.
 * @param {URL} link the link it leads to.
 * @param {*} icon an mdi icon from "@mdi/js".
 * @param {String} direction the direction in which an arrow should be pointing.
 */
const IconLink = (props) => {
    return (
        <Link to={props.link} className={styles.container}>
            {
                props.direction === "left" ? 
                    <Icon path={mdiChevronLeft}/>
                    : null
            }
            <div className={styles.innerContainer}>
                <Icon
                    path={props.icon}
                    title={props.label}
                />
                <span>{props.label}</span>
            </div>
            {
                props.direction === "right" ?
                    <Icon path={mdiChevronRight}/>
                    : null
            }
        </Link>
    )
}

export default IconLink;