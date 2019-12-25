import React from 'react';
import TagIcon from '../TagIcon/TagIcon';
import styles from './PostPreview.module.scss';

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
        <div className={styles.container}>
            <img className={styles.previewImage} src={props.previewImgUrl} alt={props.title+" preview"}/>
            <div className={styles.contents}>    
                <div className={styles.summary}>
                    <h2>{props.title}</h2>
                    <p>{props.excerpt}</p>
                </div>
                <div className={styles.bottomBar}>
                    <div className={styles.tags}>
                        {props.tags.map(t => <TagIcon tagName={t} key={t}/>)}
                    </div>
                    <span className={styles.date}>
                        {props.date}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PostPreview;
