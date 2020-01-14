import React, { useEffect, useRef } from 'react';
import Parallax from 'parallax-js';

const ParallaxScene = (props) => {

    const sceneDiv = useRef(null);

    useEffect(() => {
        new Parallax(sceneDiv.current, props);
    });
    
    return (
        <div ref={sceneDiv}>
            {props.children}
        </div>
    );
}

export default ParallaxScene;