import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Search.module.scss';

const Search = () => {

    const {keywords} = useParams();

    // #region state

    const [posts, setPosts] = useState([]);
    
    const filtersReducer = (state, action) => {
        switch(action.type){
            case "setKeywords":
                return {
                    ...state,
                    keywords: action.keywords,
                };
            default: 
                throw new Error("Invalid action "+action.type);
        }
    }
    const [filters, dispatchFilters] = useReducer(filtersReducer, 
        {
            keywords: "",

        }
    );

    // #endregion

    // #region effects

    // init effect
    useEffect(() => {
        if (keywords) {
            dispatchFilters({type: "setKeywords", keywords: keywords});
        }
    }, [keywords, ]);

    // #endregion

    return (
        <>
        <header className={styles.header}>

        </header>
        <main className={styles.main}>

        </main>
        </>
    );
}

export default Search;