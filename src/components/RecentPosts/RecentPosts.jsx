import React, { useEffect, useReducer } from 'react';
import Icon from '@mdi/react'
import { mdiMagnify, mdiLoading } from '@mdi/js'
import wpClient from '../../services/wordpress'
import PostPreview from '../PostPreview/PostPreview';
import styles from './RecentPosts.module.scss';
import InputWithButton from '../InputWithButton/InputWithButton';

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

    const getPostsAsync = () => new Promise(res => {
        wpClient.getPosts(
            { post_status: "publish" }, 
            ["title", "excerpt", "terms", "date"], 
            (err, psts) => {

                if(err) {
                    console.log(err);
                    return;
                }
                var filteredPosts = psts.filter(p => p.title.includes(state.keywords));
                res(filteredPosts);
            }
        );
    })

    const getPostsEffect = async () => {
        var psts = await getPostsAsync();
        dispatch({ type: "setPosts", posts: psts });
    }

    useEffect(() => { getPostsEffect() }, [state.keywords]);

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

    const searchSubmitted = kwds => {
        dispatch({ type: "setKeywords", keywords: kwds })
    }

    // #endregion

    return (
        <div className={styles.container}>
            <InputWithButton 
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