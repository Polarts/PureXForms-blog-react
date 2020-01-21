import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { getPostsAsync, getUsersAsync, getCommentsAsync } from '../../services/wordpress.service';

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

    return (
        <>
        <header>
            <h1>{postMeta ? postMeta.title.rendered : slug}</h1>
        </header>
        <main>
            {ReactHtmlParser(postContent)}
        </main>
        </>
    )
}

export default Post;