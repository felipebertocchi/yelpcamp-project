const { Schema, model } = require('mongoose');

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
})

module.exports = model('Campground', CampgroundSchema);