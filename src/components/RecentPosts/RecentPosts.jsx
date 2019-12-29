import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'
import wpClient from '../../services/wordpress'
import PostPreview from '../PostPreview/PostPreview';
import styles from './RecentPosts.module.scss';
import InputWithButton from '../InputWithButton/InputWithButton';

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
            <InputWithButton 
                placeholder="Find a post..."
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