import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react'
import { mdiMagnify, mdiLoading } from '@mdi/js'
import wpClient from '../../services/wordpress'
import PostPreview from '../PostPreview/PostPreview';
import styles from './RecentPosts.module.scss';
import InputWithButton from '../InputWithButton/InputWithButton';

const RecentPosts = (props) => {

    // #region state

    const [posts, setPosts] = useState([]);
    const [keywords, setKeywords] = useState("");
  
    // #endregion

    // #region effects

    const getPosts = () => {
        wpClient.getPosts(
            { post_status: "publish" }, 
            ["title", "excerpt", "terms", "date"], 
            (err, psts) => {

                if(err) {
                    console.log(err);
                    return;
                }
                var filteredPosts = psts.filter(p => p.title.includes(keywords));
                console.log(filteredPosts);
                setPosts(filteredPosts);
            }
        );
    }
    useEffect(getPosts, [keywords]);

    // #endregion

    // #region UI functions

    const mapPostsToPreviews = () => 
        posts.map(p => 
            <PostPreview 
                key={p.title}
                title={p.title}
                excerpt={p.excerpt}
                tags={p.terms.map(t => t.name)}
                date={p.date}
                previewImgUrl=""
            />
        );

    // #endregion

    // #region UI event callbacks

    const searchSubmitted = kwds => {
        console.log("search keywords: "+kwds);
        setKeywords(kwds);
    }

    // #endregion

    return (
        <div className={styles.container}>
            <InputWithButton 
                placeholder="Find a post..."
                onSubmit={searchSubmitted}
                buttonContent={
                    <Icon 
                        path={mdiMagnify}
                        title="Search"
                        size={0.5}
                        color="White"
                        style={{transform: "scale(1.4)"}}
                    />
                }
            />
            <div className={styles.posts}>
                {mapPostsToPreviews()}
            </div>
        </div>
    );
}

export default RecentPosts;