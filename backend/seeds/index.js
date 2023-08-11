require('colors');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
const cities = require('./cities');
const cloudImages = require('./cloudImages');
const { getImage } = require('./getImage');
const { places, descriptors } = require('./seedHelpers');
const { amenities, activities } = require('./services');
const args = process.argv.slice(2);
require('dotenv').config({ path: __dirname + '/../.env' })
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("[mongodb] database connected".cyan);
})

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const pickRandomElements = (array, limit) => {
    const randomElements = [];

    const cloneArray = [...array];

    while (randomElements.length < limit) {
        const randomIndex = Math.floor(Math.random() * cloneArray.length);
        const randomElement = cloneArray.splice(randomIndex, 1)[0];
        randomElements.push(randomElement);
    }

    return randomElements;
}

const seedDB = async (type, count, deletePrevious) => {
    if (deletePrevious) {
        console.log("Deleting previous data...".red)
        await Campground.deleteMany({});
        await Review.deleteMany({});
    }
    console.log("Generating new data...".yellow)
    for (let i = 0; i < count; i++) {
        const images = [];
        const price = parseFloat((Math.random() * (60 - 10) + 10).toFixed(2));
        const random1000 = Math.floor(Math.random() * 1000);
        const randomCity = cities[random1000];
        const randomAmenities = pickRandomElements(amenities, Math.floor(Math.random() * 7) + 2); // random number between 2 and 8
        const randomActivities = pickRandomElements(activities, Math.floor(Math.random() * 7) + 2);
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
            author: "64d69bd60c0c3ba51b6343ad", // admin _id
            images: images,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae tenetur minima, hic deleniti iste iusto, omnis pariatur doloribus quis necessitatibus tempora dicta aliquid recusandae esse? Quaerat tempora placeat autem doloribus.',
            price: price,
            location: `${randomCity.city}, ${randomCity.state}`,
            amenities: randomAmenities,
            activities: randomActivities,
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
let deletePrevious = false;
let count = args[1] || 5;

if (args.includes('deletePrevious')) {
    deletePrevious = true;
}


if (args.includes('cloudinary')) {
    type = "cloudinary"
} else if (args.includes('unsplash')) {
    type = "unsplash"
} else {
    type = "both unsplash and cloudinary";
}

seedDB(type, count, deletePrevious).then(() => {
    console.log(`Generated ${count} camps with images from ${type}`.bgYellow)
    console.log("[mongodb] campgrounds collection seeded successfully".cyan);
    mongoose.connection.close();
    console.log("[mongodb] database disconnected".cyan);
});