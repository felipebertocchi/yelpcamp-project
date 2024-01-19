if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

require('colors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const cors = require('cors')

const mongo = require('./database/mongo');
const userRouter = require('./routes/userRouter');
const campgroundsRouter = require('./routes/campgroundsRouter');
const reviewsRouter = require('./routes/reviewsRouter');

const app = express();
const port = 4000;

const corsOptions = {
    origin: process.env.FRONTEND_DOMAIN || "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize());
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [
    "https://cdn.jsdelivr.net",
];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/`,
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());

app.use('/', userRouter)
app.use('/campgrounds', campgroundsRouter)
app.use('/campgrounds/:id/reviews', reviewsRouter)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Yelp Camp' })
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Something went wrong', 404))
})

app.listen(port, async () => {
    await mongo.connect();
    if (process.env.NODE_ENV !== "production") {
        console.log('Webserver running on', `http://localhost:${port}`.yellow)
    } else {
        console.log('Webserver running on production'.green)
    }
})