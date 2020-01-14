import * as wp from 'wordpress';

const wpClient = wp.createClient({
    url: "pxf.local",
    username: "admin",
    password: "admin"
})
export default wpClient;

// #region get functions

export const getPostsAsync = (keywords) => new Promise(result => {
    wpClient.getPosts(
        { post_status: "publish" }, 
        ["title", "excerpt", "terms", "date"], 
        (err, psts) => {

            if(err) {
                console.log(err);
                return;
            }
            var filteredPosts = psts.filter(p => p.title.toLowerCase().includes(keywords.toLowerCase()));
            result(filteredPosts);
        }
    );
});

export const getPagesAsync = () => new Promise(result => {
    wpClient.getPosts(
        { post_status: "publish", post_type: "page" }, 
        [], 
        (err, pages) => {

            if(err) {
                console.log(err);
                return;
            }
            result(pages);
        }
    );
});

// #endregion
