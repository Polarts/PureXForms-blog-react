import React from 'react';
import styles from './TagIcon.module.scss';

/**
 * Renders a tag icon instead of just text.
 * @param {String} tagName the tag name of which the icon will be displayed.
 */
const TagIcon = (props) => {
    if (props.tagName === "Uncategorized") {
        return null;
    }
    var tagImg = require("../../res/tags/"+props.tagName+".png");
    return (
        <div className={styles.container}>
            <img src={tagImg} alt={props.tagName}/>
            <span className={styles.tooltip}>
                {props.tagName}
            </span>
        </div>
    )
}

export default TagIcon;