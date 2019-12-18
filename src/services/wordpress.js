import * as wp from 'wordpress';

const wpClient = wp.createClient({
    url: "pxf.local",
    username: "admin",
    password: "admin"
})

export default wpClient;