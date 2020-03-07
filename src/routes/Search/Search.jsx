import React, { useState, useRef, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
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

    //#region state

    const [keywords, setKeywords] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState([]);
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [level, setLevel] = useState(NaN);
    const [post, setPosts] = useState([]);

    //#endregion

    // init effect
    useEffect(() => {
        const {keywords, author, startDate, endDate, tags, level} = queryString.parse(location.search);
        if (keywords) setKeywords(keywords);
        if (author) setAuthor(author);
        if (startDate) setDateFrom(startDate);
        if (endDate) setDateTo(endDate);
        if (tags) setTags(tags);
        if (level) setLevel(level); 

    }, [location]);

    const tagsChanged = val => {
        setTags([val]);
    }

    return (
        <>
        <header>
            <NavBar title="Search All Posts"/>
        </header>
        <main className={styles.main}>
            <form className={styles.searchForm}>

                <div className={`${styles.kwd} ${styles.labeledInput}`}>
                    <label htmlFor="Keywords">Keywords</label>
                    <input className="u-rounded textbox" 
                           name="keywords" 
                           value={keywords} 
                           onChange={e => setKeywords(e.target.value)}/>
                </div>

                <div className={`${styles.ath} ${styles.labeledInput}`}>
                    <label htmlFor="author">Author</label>
                    <input className="u-rounded textbox" 
                           name="author"
                           value={author}
                           onChange={e => setAuthor(e.target.value)}/>
                </div>

                <div className={`${styles.dt1} ${styles.labeledInput}`}>
                    <label htmlFor="startDate">From</label>
                    <input className="u-rounded textbox" 
                           name="startDate" 
                           type="date"
                           value={dateFrom}
                           onChange={e => setDateFrom(e.target.value)}/>
                </div>

                <div className={`${styles.dt2} ${styles.labeledInput}`}>
                    <label htmlFor="endDate">To</label>
                    <input className="u-rounded textbox" 
                           name="endDate" 
                           type="date"
                           value={dateTo}
                           onChange={e => setDateTo(e.target.value)}/>
                </div>

                <div className={`${styles.tgs} ${styles.labeledInput}`}>
                    <label htmlFor="tags">Tags</label>
                    <input className="u-rounded textbox" 
                           name="tags"
                           value={tags}
                           onChange={e => tagsChanged(e.target.value)}/>
                </div>

                <div className={`${styles.lvl} ${styles.labeledInput}`}>
                    <label>Level</label>
                    <div className={styles.radioButtons}>
                        <input type="radio" 
                               name="level" 
                               value="0" 
                               checked={level == 0}
                               onChange={() => setLevel(0)}/>
                        <span onClick={() => setLevel(0)}>Beginner</span>
                        <input type="radio" 
                               name="level" 
                               value="1" 
                               checked={level == 1}
                               onChange={() => setLevel(1)}/>
                        <span onClick={() => setLevel(1)}>Intermediate</span>
                        <input type="radio" 
                               name="level" 
                               value="2" 
                               checked={level == 2}
                               onChange={() => setLevel(2)}/>
                        <span onClick={() => setLevel(2)}>Expert</span>
                    </div>
                </div>

                <input className="u-rounded primary button" type="submit" value="Search"/>

                <div className={styles.divider}/>

            </form>

            <details>
                <summary>2020</summary>
            </details>
        </main>
        </>
    );
}

export default Search;