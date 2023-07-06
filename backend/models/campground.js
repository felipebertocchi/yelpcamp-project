const { Schema, model } = require('mongoose');
const Review = require('./review');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const ServiceSchema = new Schema({
    name: String,
    active: Boolean
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
});

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    contact: {
        email: String,
        phone: String,
        includeAccContact: Boolean,
    },
    amenities: [ServiceSchema],
    activities: [ServiceSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    averageRating: Number
}, { timestamps: true, toJSON: { virtuals: true } });

CampgroundSchema.virtual('properties').get(function () {
    return {
        id: this.id,
        title: this.title,
        location: this.location
    }
});

CampgroundSchema.post(('findOneAndDelete'), async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

CampgroundSchema.pre('save', async function (next) {
    if (this.reviews && this.reviews.length > 0) {
        const campgroundId = this._id;

        const query = await Review
            .aggregate([
                {
                    $match: { campground: campgroundId }
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: '$rating' }
                    }
                }
            ])
            .exec();

        this.averageRating = parseFloat(query[0].averageRating.toFixed(1));
    }
    next();
})

module.exports = model('Campground', CampgroundSchema);