require('colors');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { getImage } = require('./getImage');
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
    console.log("generating new data...")
    for (let i = 0; i < 15; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = parseFloat(((Math.floor(Math.random() * 2000) + 10) / 100).toFixed(2));
        const randomCity = cities[random1000];
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            author: "6445bade9c7c107314ba8d10", // admin _id
            imageUrl: await getImage(),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae tenetur minima, hic deleniti iste iusto, omnis pariatur doloribus quis necessitatibus tempora dicta aliquid recusandae esse? Quaerat tempora placeat autem doloribus.',
            price: price,
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