require('dotenv').config();
const axios = require("axios");

// call unsplash and return small image
async function getImage() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: process.env.UNSPLASH_API_KEY,
                collections: 483251,
            },
        })
        return {
            url: resp.data.urls.small,
            filename: `unsplash/${resp.data.id}`
        }
    } catch (err) {
        console.error(err)
    }
}

exports.getImage = getImage;