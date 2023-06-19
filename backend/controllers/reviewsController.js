const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports = {
    postNewReview: async (req, res) => {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        const review = new Review({ ...req.body.review, campground });
        review.author = req.user._id;
        campground.reviews.push(review)
        await review.save();
        await campground.save();
        req.flash('success', 'Succesfully added a new review');
        res.redirect(`/campgrounds/${campground._id}`);
    },
    deleteReview: async (req, res) => {
        const { id, reviewId } = req.params;
        await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash('success', 'Succesfully deleted review');
        res.redirect(`/campgrounds/${id}`);
    }
}