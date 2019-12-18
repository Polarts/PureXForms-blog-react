import React from 'react';

/**
 * Renders a tag icon instead of just text.
 * @param {String} props.tagName the tag name of which the icon will be displayed.
 */
const TagIcon = (props) => {
    var tagImg = require("../../res/tags/"+props.tagName+".png");
    return (
        <img src={tagImg} alt={props.tagName}/>
    )
}

export default TagIcon;