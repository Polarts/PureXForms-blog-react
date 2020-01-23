import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { getPostsAsync, getUsersAsync, getCommentsAsync } from '../../services/wordpress.service';
import styles from './Post.module.scss';

const Post = () => {

    const {slug} = useParams();

    // #region state
    
    const [postMeta, setPostMeta] = useState(null);
    const [author, setAuthor] = useState(null);
    const [postContent, setPostContent] = useState(null);
    const [comments, setComments] = useState([]);

    // #endregion

    // #region effects

    // Init effect
    useEffect(() => {
        getPostsAsync({slug: slug}, ["id", "title", "author", "date", "categories", "tags", "featured_media"])
            .then(data => {
                console.log(data);
                setPostMeta(data[0]);
            });
    }, [slug]);

    // get author effect
    useEffect(() => {
        if(postMeta) {
            getUsersAsync({id: postMeta.author}, ["first_name", "last_name", "description", "roles"])
                .then(data => {
                    console.log(data);
                    setAuthor(data[0]);
                })
        }
    }, [postMeta]);

    // get content effect
    useEffect(() => {
        if (postMeta) {
            getPostsAsync({slug: slug}, ["content"])
                .then(data => {
                    console.log(data);
                    setPostContent(data[0].content.rendered);
                });
        }
    }, [postMeta, slug]);

    // get comments effect
    useEffect(() => {
        if (postMeta) {
            getCommentsAsync(postMeta.id)
                .then(data => {
                    console.log(data);
                    setComments(data);
                });
        }
    })

    // #endregion

    // #region inner renderers

    const metaContentRenderer = () => {
        if (postMeta) {
            return (
                <div className={styles.metaContent}>
                    <img src={postMeta.featured_media} alt={`${postMeta.title} preview`}/>
                    <div className={styles.tagsAndDate}>
                        <div className={styles.tags}>
                            {postMeta.tags}
                        </div>
                        <div className={styles.date}>
                            { moment(postMeta.date).format("MMM Do, YYYY") }
                        </div>
                    </div>
                </div>
            )
        }
    }

    // #endregion

    return (
        <>
        <header>
            <h1>{postMeta ? postMeta.title.rendered : slug}</h1>
        </header>
        <main className={styles.main}>
            { metaContentRenderer() }
            <div className={styles.postContent}>
                {ReactHtmlParser(postContent)}
            </div>
        </main>
        </>
    )
}

export default Post;