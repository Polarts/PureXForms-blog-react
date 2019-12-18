import React from 'react';
import TagIcon from '../TagIcon/TagIcon';

/**
 * A post preview seen from the home page.
 * @param {String} props.title The post title.
 * @param {String} props.excerpt The post excert.
 * @param {String[]} props.tags Array of the post tags.
 * @param {String} props.date The date it was posted, stringified.
 * @param {String} props.previewImgUrl URL of the preview image.
 */
const PostPreview = (props) => {

    return (
        <div>
            <img key="previewImage" src={props.previewImgUrl} alt={props.title+" preview"}/>
            <div key="summary">
                <h3>{props.title}</h3>
                <p>{props.excerpt}</p>
            </div>
            <div key="bottomBar">
                <div key="tags">
                    {props.tags.map(t => <TagIcon tagName={t}/>)}
                </div>
                <span key="date">
                    {props.date}
                </span>
            </div>
        </div>
    )
}

export default PostPreview;
