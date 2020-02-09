import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import styles from './Search.module.scss';

/**
 * The search page.
 * This page utilized URL query params in order to create a sharable search link.
 * Each time the form is submitted, the page refreshes and the URL updates.
 * The init state will read the query params and parse them, then get the filtered posts from the service.
 */
const Search = () => {

    const location = useLocation();

    const [post, setPosts] = useState([]);

    // init effect
    useEffect(() => {
        console.log(queryString.parse(location.search))
    }, [location]);

    return (
        <>
        <header className={styles.header}>
            Advanced Search
        </header>
        <main className={styles.main}>
            <form className={styles.searchForm}>
                <input name="keywords"/>
                <input type="submit"/>
            </form>
        </main>
        </>
    );
}

export default Search;