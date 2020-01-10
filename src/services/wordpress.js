import * as wp from 'wordpress';

const wpClient = wp.createClient({
    url: "pxf.local",
    username: "admin",
    password: "admin"
})
export default wpClient;

export const getPostsAsync = (keywords) => new Promise(res => {
    wpClient.getPosts(
        { post_status: "publish" }, 
        ["title", "excerpt", "terms", "date"], 
        (err, psts) => {

            if(err) {
                console.log(err);
                return;
            }
            var filteredPosts = psts.filter(p => p.title.toLowerCase().includes(keywords.toLowerCase()));
            res(filteredPosts);
        }
    );
});
