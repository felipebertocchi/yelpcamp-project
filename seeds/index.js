require('colors');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("[mongodb] database connected".cyan);
})

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomCity = cities[random1000];
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${randomCity.city}, ${randomCity.state}`,
            latitude: `${randomCity.latitude}`,
            longitude: `${randomCity.longitude}`,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    console.log("[mongodb] campgrounds collection seeded successfully".cyan);
    mongoose.connection.close();
    console.log("[mongodb] database disconneted".cyan);

});