const mongoose = require("mongoose");
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yelp-camp';

module.exports = {
    connect: async () => {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => { console.log("[mongodb] database connected".cyan) })
        .catch((err) => { console.error("[mongodb] connection error:".red, err) });
    },
};