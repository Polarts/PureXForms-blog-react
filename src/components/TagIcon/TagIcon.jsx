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

    const renderTag = () => {
        try {
            var tagImg = require("../../res/png/tags/"+props.tagName+".png");
            return <img src={tagImg} alt={props.tagName}/>
        } catch {
            return <div className={styles.letterTag}>{props.tagName.charAt(0)}</div>
        }

    }
    return (
        <div className={styles.container}>
            {renderTag()}
            <span className="tooltip">
                {props.tagName}
            </span>
        </div>
    )
}

export default TagIcon;