import React, { useState, useEffect } from 'react';
import wpClient from '../../services/wordpress'
import PostPreview from '../PostPreview/PostPreview';
import styles from './RecentPosts.module.scss';

const RecentPosts = (props) => {

    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
        wpClient.getPosts({}, ["title", "excerpt", "terms", "date", "type"], (err, psts) => {

            if(err) {
                console.log(err);
                return;
            }
            
            console.log(psts);
            setPosts(psts.filter(p => p.type !== "draft"));
        });
    }, []);

    const mapPostsToPreviews = () => 
        posts.map(p => 
            <PostPreview 
                title={p.title}
                excerpt={p.excerpt}
                tags={p.terms.map(t => t.name)}
                date={p.date}
                previewImgUrl=""
            />
        )

    return (
        <div className={styles.container}>
            {mapPostsToPreviews()}
        </div>
    );
}

export default RecentPosts;