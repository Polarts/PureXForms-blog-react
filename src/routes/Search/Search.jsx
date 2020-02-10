import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import styles from './Search.module.scss';
import NavBar from '../../components/NavBar/NavBar';

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
        <header>
            <NavBar title="Search All Posts"/>
        </header>
        <main className={styles.main}>
            <form className={styles.searchForm}>
                <div className={`${styles.keywordsInput} ${styles.labeledInput}`}>
                    <label htmlFor="Keywords">Keywords</label>
                    <input className="u-rounded textbox" name="keywords"/>
                </div>
                <input className="u-rounded primary button" type="submit"/>
            </form>
        </main>
        </>
    );
}

export default Search;