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
            let url = BASE_URL + "tags?_fields=id,name";
            tags = {};
            await ax.get(url).then(response => {
                response.data.forEach(tag =>
                    tags[tag.id] = tag.name
                );
            });
        }
        result(tags);
    }
);

/**
 * Gets summarized posts with query params.
 * Posts are dynamic, so they're not cached.
 * Requested fields: title, excerpt, tags, date, link
 * 
 * @param {Object} query a query params object in wordpress api format.
 * 
 * @returns a promise for an array of WP posts
 */
export const getPostsAsync = (query) => new Promise( 
    async (result) => {
        let url = BASE_URL + "posts?";
        
        if (query) {
            Object.entries(query).forEach(e => {
                if(e[1]) {
                    url += e[0] + "=" + e[1] + "&";
                }
            });
        }

        url += "_fields=title,excerpt,tags,date,link";

        await ax.get(url).then(response => result(response.data));
    }
);

// #endregion
