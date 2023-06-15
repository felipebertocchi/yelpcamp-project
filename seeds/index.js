require('colors');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
const cities = require('./cities');
const cloudImages = require('./cloudImages');
const { getImage } = require('./getImage');
const { places, descriptors } = require('./seedHelpers');
const args = process.argv.slice(2);

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

const seedDB = async (type, count = 5, addOn = false) => {
    if (!addOn) {
        await Campground.deleteMany({});
        await Review.deleteMany({});
    }
    console.log("Generating new data...".yellow)
    for (let i = 0; i < count; i++) {
        const images = [];
        const price = parseFloat((Math.random() * (60 - 10) + 10).toFixed(2));
        const random1000 = Math.floor(Math.random() * 1000);
        const randomCity = cities[random1000];
        const imgCount = Array(Math.floor(Math.random() * 4) + 2); // random number between 2 and 5
        if (type === "unsplash") {
            for (const _ of imgCount) {
                images.push(await getImage());
            }
        } else if (type === "cloudinary") {
            for (const _ of imgCount) {
                const random10 = Math.floor(Math.random() * 10);
                images.push(cloudImages[random10]);
            }
        } else {
            for (const [rn, _] of imgCount.entries()) {
                const random10 = Math.floor(Math.random() * 10);
                if (i % 2 === 0) {
                    if (rn % 2 === 0) {
                        images.push(cloudImages[random10]);
                    } else {
                        images.push(await getImage());
                    }
                } else {
                    if (rn % 2 === 0) {
                        images.push(await getImage());
                    } else {
                        images.push(cloudImages[random10]);
                    }
                }
            }
        }
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            author: "6445bade9c7c107314ba8d10", // admin _id
            images: images,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae tenetur minima, hic deleniti iste iusto, omnis pariatur doloribus quis necessitatibus tempora dicta aliquid recusandae esse? Quaerat tempora placeat autem doloribus.',
            price: price,
            location: `${randomCity.city}, ${randomCity.state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    randomCity.longitude,
                    randomCity.latitude,
                ]
            },
        })
        await camp.save();
    }
}

let type;
let count = args[1] || 5;
let addOn = args[2];

if (args.includes('cloudinary')) {
    type = "cloudinary"
} else if (args.includes('unsplash')) {
    type = "unsplash"
} else {
    type = "both unsplash and cloudinary";
}

seedDB(type, count, addOn).then(() => {
    console.log(`Generated ${count} camps with images from ${type}`.bgYellow)
    console.log("[mongodb] campgrounds collection seeded successfully".cyan);
    mongoose.connection.close();
    console.log("[mongodb] database disconnected".cyan);
});