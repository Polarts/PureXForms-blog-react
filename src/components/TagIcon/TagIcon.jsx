import React from 'react';

/**
 * Renders a tag icon instead of just text.
 * @param {String} props.tagName the tag name of which the icon will be displayed.
 */
const TagIcon = (props) => {
    return (
        <img src={window.basePath+"res/tags/"+props.tagName+".png"} alt={props.tagName}/>
    )
}

export default TagIcon;