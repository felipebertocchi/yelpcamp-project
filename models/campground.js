const { Schema, model } = require('mongoose');
const Review = require('./review');

const CampgroundSchema = new Schema({
    title: String,
    imageUrl: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, { timestamps: true });

CampgroundSchema.post(('findOneAndDelete'), async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
})

module.exports = model('Campground', CampgroundSchema);