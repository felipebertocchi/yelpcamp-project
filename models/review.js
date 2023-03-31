const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    campground: {
        type: Schema.Types.ObjectId,
        ref: "Campground"
    }
})

module.exports = model('Review', reviewSchema);