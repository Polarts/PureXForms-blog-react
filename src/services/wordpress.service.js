import * as ax from 'axios';

const BASE_URL = "/wp-json/wp/v2/";

// #region cache

var tags;

// #endregion

// #region get functions

/**
 * Gets all the tags.
 * Tags are cached, so that if they're already fetched there's no need to fetch again.
 */
export const getTagsAsync = () => new Promise( async (result) => {
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
});

/**
 * Gets summarized posts with pagination, filtered by keywords.
 * Posts are limited to the following fields:
 *  1. title
 *  2. excerpt
 *  3. tags
 *  4. date
 *  5. link
 * 
 * @param {Object} query a search query object in wordpress api format.
 * @param {Number} perPage amount of posts to display per page. if no page is set, it will limit the total.
 * @param {Number} page current page index.
 * 
 * @returns 
 */
export const getPostsAsync = (query, perPage, page) => new Promise( async (result) => {
    let url = BASE_URL + "posts?";
    
    if (query) {
        Object.entries(query).forEach(e => {
            if(e[1]) {
                url += e[0] + "=" + e[1] + "&";
            }
        });
    }

    url += "_fields=title,excerpt,tags,date,link&";

    if (perPage) {
        url += "per_page=" + String(perPage) + "&";
    }

    if (page) {
        url += "page=" + String(page);
    }

    await ax.get(url).then(response => result(response.data));
});

// #endregion
