const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports = {
    postNewReview: async (req, res) => {
        try {
            const { id } = req.params;
            const campground = await Campground.findById(id);
            const review = new Review({ ...req.body.review, campground });
            review.author = req.user._id;
            campground.reviews.push(review);
            await review.save();
            await campground.save();
            res.status(200).json({ message: 'Successfully added a new review' });
        } catch (error) {
            res.status(500).json({ message: 'There was an error processing your review' });
        }
    },
    deleteReview: async (req, res) => {
        try {
            const { id, reviewId } = req.params;
            await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
            await Review.findByIdAndDelete(reviewId);
            res.status(200).json({ message: 'Successfully deleted your review' });
        } catch (error) {
            res.status(500).json({ message: 'There was an error deleting your review' });
        }
    }
}