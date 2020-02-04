import React from 'react';
import TagIcon from '../TagIcon/TagIcon';
import styles from './PostPreview.module.scss';
import ReactHtmlParser from 'react-html-parser';
import { useHistory } from "react-router-dom";
import DateFormatter from '../DateFormatter/DateFormatter';

/**
 * A post preview seen from the home page.
 * @param {String} title The post title.
 * @param {String} excerpt The post excert.
 * @param {String[]} tags Array of the post tags.
 * @param {String} date The date it was posted, stringified.
 * @param {String} previewImgUrl URL of the preview image.
 * @param {String} slug post slug for rediirection.
 */
const PostPreview = (props) => {

    const history = useHistory();

    const previewClicked = () => {
        if ("slug" in props) {
            history.push("/post/"+props.slug);
        }
    }

    return (
        <div className={styles.container} onClick={previewClicked}>
            <img className={styles.previewImage} src={props.previewImgUrl} alt={props.title+" preview"}/>
            <div className={styles.contents}>    
                <div className={styles.summary}>
                    <h2>{props.title}</h2>
                    {ReactHtmlParser(props.excerpt)}
                </div>
                <div className={styles.bottomBar}>
                    <div className={styles.tags}>
                        {props?.tags?.map(t => <TagIcon tagName={t} key={t}/>)}
                    </div>
                    <DateFormatter date={props.date}/>
                </div>
            </div>
        </div>
    )
}

export default PostPreview;
