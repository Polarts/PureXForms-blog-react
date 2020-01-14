import React, { useEffect, useReducer } from 'react';
import Icon from '@mdi/react'
import { mdiMagnify, mdiLoading } from '@mdi/js'
import { getPostsAsync } from '../../services/wordpress.service'
import PostPreview from '../PostPreview/PostPreview';
import styles from './RecentPosts.module.scss';
import SingleLineForm from '../SingleLineForm/SingleLineForm';

const RecentPosts = (props) => {

    // #region state

    const reducer = (state, action) => {
        switch(action.type){
            case "setPosts":
                return {
                    ...state,
                    posts: action.posts,
                    postsFetched: true
                };
            case "setKeywords":
                return {
                    ...state,
                    keywords: action.keywords,
                    postsFetched: false
                };
            default: 
                throw new Error("Invalid action "+action.type);
        }
    }

    const [state, dispatch] = useReducer(reducer, 
        {
            posts: [],
            postsFetched: false,
            keywords: ""
        }
    );
  
    // #endregion

    // #region effects

    useEffect(() => { 
        /**
         * Gets the posts filtered by keywords.
         */
        const getPostsEffect = async () => {
            var posts = await getPostsAsync(state.keywords);
            dispatch({ type: "setPosts", posts: posts });
        }
        getPostsEffect();
    }, [state.keywords]);

    // #endregion

    // #region UI functions

    const mapPostsToPreviews = () => {
        console.log(state.posts)
        return state.posts.map(p => 
            <PostPreview 
                key={p.title}
                title={p.title}
                excerpt={p.excerpt}
                tags={p.terms.map(t => t.name)}
                date={p.date}
                previewImgUrl=""
            />
        );
    }

    // #endregion

    // #region UI event callbacks

    const searchSubmitted = keywords => {
        dispatch({ type: "setKeywords", keywords: keywords })
    }

    // #endregion

    return (
        <div className={styles.container}>
            <SingleLineForm 
                placeholder="Find a post..."
                onSubmit={searchSubmitted}
                buttonContent={
                    <Icon 
                        path={state.postsFetched? mdiMagnify : mdiLoading}
                        title="Search"
                        color="White"
                        spin={!state.postsFetched}
                        className="mdIcon"
                    />
                }
            />
            <div className={styles.posts}>
                { mapPostsToPreviews() }
            </div>
        </div>
    );
}

export default RecentPosts;