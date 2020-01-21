import * as ax from 'axios';

const BASE_URL = "/wp-json/wp/v2/";

// #region cache

var tags;

// #endregion

// #region get functions

/**
 * Gets all the tags.
 * Tags are static, so they're cached to prevent extra API calls.
 * Requested fields: id, name
 * 
 * @returns a promise for a tags object mapped as { id: name }
 */
export const getTagsAsync = () => new Promise( 
    async (result) => {
        if (!tags) {
            let url = BASE_URL+ "tags?_fields=id,name&per_page=100";
            tags = {};
            await ax.get(url).then(response => {
                console.log(response.data)
                response.data.forEach(tag =>
                    tags[tag.id] = tag.name
                );
            });
        }
        result(tags);
    }
);

/**
 * Gets posts with specified query params and fields.
 * Posts are dynamic, so they're not cached.
 * 
 * @param {Object} query a query params object in wordpress api format.
 * @param {Array<String>} fields an array of fields to return in each post.
 * 
 * @returns a promise for an array of WP posts
 */
export const getPostsAsync = (query, fields) => new Promise( 
    async (result) => {
        let url = BASE_URL + "posts?";
        
        if (query) {
           url = mapObjectToQueryString(url, query);
        }

        if(fields) {
            url += "_fields="+fields.join(",");
        }

        await ax.get(url).then(response => result(response.data));
    }
);

/**
 * Gets users with specified query params and fields.
 * Users are dynamic, so they're not cached.
 * 
 * @param {Object} query a query params object in wordpress api format.
 * @param {Array<String>} fields an array of fields to return in each user.
 * 
 * @returns a promise for an array of WP users
 */
export const getUsersAsync = (query, fields) => new Promise( 
    async (result) => {
        let url = BASE_URL + "users?";
        
        if (query) {
           url = mapObjectToQueryString(url, query);
        }

        if(fields) {
            url += "_fields="+fields.join(",");
        }

        await ax.get(url).then(response => result(response.data));
    }
);

/**
 * Gets comments for a specific post, with only the relevant data.
 * 
 * @param {String} postId The post's ID.
 * 
 * @returns a promise for an array of WP comments.
 */
export const getCommentsAsync = (postId) => new Promise( 
    async (result) => {
        let url = BASE_URL + `users?post=${postId}&_fields=author_name,author_email,content,date`;
        await ax.get(url).then(response => result(response.data));
    }
);

// #endregion

// #region helper functions

/**
 * Maps an object of query params into a query string.
 * 
 * @param {String} baseUrl The base URL to generate query string from 
 * @param {*} qObject the object of query param key-value pairs 
 */
const mapObjectToQueryString = (baseUrl, qObject) => {
    Object.entries(qObject).forEach(e => {
        if(e[1]) {
            baseUrl += e[0] + "=" + e[1] + "&";
        }
    })
    return baseUrl;
}

// #endregion
