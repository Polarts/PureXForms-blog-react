import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {

    const {slug} = useParams();

    useEffect(() => {
        
    }, []);

    return (
        <>
            <h1>{slug}</h1>
        </>
    )
}

export default Post;