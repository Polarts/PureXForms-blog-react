import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import DateFormatter from '../../components/DateFormatter/DateFormatter';
import { getPostsAsync, getUsersAsync, getCommentsAsync } from '../../services/wordpress.service';
import styles from './Post.module.scss';
import NavBar from '../../components/NavBar/NavBar';

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
    }, [postMeta])

    // #endregion

    // #region inner components
    
    const MetaContent = () => {
        if (postMeta) {
            return (
                <div className={styles.metaContent}>
                    <img className={styles.previewImg} src={"https://i7.pngguru.com/preview/343/207/672/iphone-x-iphone-8-plus-iphone-7-apple-iphone.jpg"} alt={`${postMeta.title} preview`}/>
                    <div className={styles.tagsAndDate}>
                        <div className={styles.tags}>
                            {postMeta.tags}
                        </div>
                        <DateFormatter date={postMeta.date}/>
                    </div>
                </div>
            )
        }
        return <></>;
    }

    // #endregion

    return (
        <>
        <header>
            <NavBar title={postMeta?.title?.rendered ?? slug}/>
        </header>
        <main className={styles.main}>
            <MetaContent/>
            <div className={styles.postContent}>
                {ReactHtmlParser(postContent)}
            </div>
        </main>
        </>
    )
}

export default Post;