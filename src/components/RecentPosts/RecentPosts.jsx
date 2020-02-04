import React, { useEffect, useReducer } from 'react';
import Icon from '@mdi/react'
import { mdiMagnify, mdiLoading } from '@mdi/js'
import { getPostsAsync, getTagsAsync } from '../../services/wordpress.service'
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
            case "init":
                return {
                    ...state,
                    tags: action.tags
                }
            default: 
                throw new Error("Invalid action "+action.type);
        }
    }

    const [state, dispatch] = useReducer(reducer, 
        {
            posts: [],
            tags: {},
            perPage: 4,
            postsFetched: false,
            keywords: ""
        }
    );
  
    // #endregion

    // #region effects

    /** Init effect */
    useEffect(() => {
        (async () => {
            await getTagsAsync()
                .then(res => dispatch({type: "init", tags: res}));
        })()
    }, []);

    /** Get posts effect */
    useEffect(() => {
        (async () => {
            await getPostsAsync(
                    {search: state.keywords, per_page: state.perPage},
                    ["title", "excerpt", "tags", "date", "slug"]
                ).then(res => dispatch({ type: "setPosts", posts: res }));
        })() 
    }, [state.keywords, state.perPage]);

    // #endregion

    // #region render helpers

    const mapPostsToPreviews = () => {
        return state.posts.map(p => 
            <PostPreview 
                key={p.title + p.date}
                title={p.title.rendered}
                excerpt={p.excerpt.rendered}
                tags={p.tags.map(id => state.tags.hasOwnProperty(id) ? state.tags[id] : "Uncategorized")}
                date={p.date}
                previewImgUrl=""
                slug={p.slug}
            />
        );
    }

    // #endregion

    // #region UI event callbacks

    const searchSubmitted = keywords => {
        if (state.postsFetched) {
            dispatch({ type: "setKeywords", keywords: keywords });
        }
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