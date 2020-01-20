import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { getPostsAsync } from '../../services/wordpress.service';

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
        getPostsAsync({slug: slug}, ["title", "author", "date", "categories", "tags", "featured_media"])
            .then(meta => {
                console.log(meta);
                setPostMeta(meta[0]);
            });
    }, [slug]);

    // get author effect
    useEffect(() => {
        if(postMeta !== null) {

        }
    }, [postMeta]);

    // get content effect
    useEffect(() => {
        if (postMeta !== null) {
            getPostsAsync({slug: slug}, ["content"])
                .then(response => {
                    console.log(response);
                    setPostContent(response[0].content.rendered);
                });
        }
    }, [postMeta, slug]);

    // #endregion

    return (
        <>
            <h1>{postMeta ? postMeta.title.rendered : slug}</h1>
            {ReactHtmlParser(postContent)}
        </>
    )
}

export default Post;