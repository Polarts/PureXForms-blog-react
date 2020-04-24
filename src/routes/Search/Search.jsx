/* eslint-disable eqeqeq */
import React, { useState, useRef, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import moment from 'moment';
import { getPostsAsync, getTagsAsync } from '../../services/wordpress.service'
import styles from './Search.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import PostPreview from '../../components/PostPreview/PostPreview';

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
    const [posts, setPosts] = useState([]);
    const [allTags, setAllTags] = useState([]);

    //#endregion

    // init effect
    useEffect(() => {
        
        const {keywords, author, startDate, endDate, tags, level} = queryString.parse(location.search);
        
        //#region set state
        if (keywords) setKeywords(keywords);
        if (author) setAuthor(author);
        if (startDate) setDateFrom(startDate);
        if (endDate) setDateTo(endDate);
        if (tags) setTags(tags);
        if (level) setLevel(level); 
        //#endregion

        //#region get posts
        (async () => await getPostsAsync(
                {search: keywords},
                ["title", "excerpt", "tags", "date", "slug"]
            ).then(res => {setPosts(res);})
        )();
        //#endregion

        //#region get all tags
        (async () => {
            await getTagsAsync()
                .then(res => setAllTags(res));
        })()
        //#endregion

    }, [location]);

    const tagsChanged = val => {
        setTags([val]);
    }

    const PostsByDate = () => {
        if (posts) {
            let postsByDate = {};
            posts.forEach(p => {
                let year = moment(p.date).format("YYYY");
                let month = moment(p.date).format("MMM");

                if (!(year in postsByDate)) {
                    postsByDate[year] = {};
                }

                if (!(month in postsByDate[year])) {
                    postsByDate[year][month] = [];
                }

                postsByDate[year][month].push(p);
            });

            let postViews = [];
            Object.keys(postsByDate).forEach(year => {
                postViews.push(
                    <details>
                        <summary className={styles.year}>
                            {year}
                        </summary>
                        {Object.keys(postsByDate[year]).map(month => 
                            <details>
                                <summary className={styles.month}>
                                    {month}
                                </summary>
                                <div className={styles.postsRow}>
                                    {Object.values(postsByDate[year][month]).map(post => 
                                        <PostPreview title={post.title.rendered}
                                                    excerpt={post.excerpt}
                                                    tags={post.tags.map(id => allTags.hasOwnProperty(id) ? allTags[id] : "Uncategorized")}
                                                    date={post.date}
                                                    slug={post.slug}/>
                                    )}
                                </div>
                            </details>
                        )}
                    </details>
                );
            });
            return postViews;
        }
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
            <PostsByDate/>
        </main>
        </>
    );
}

export default Search;