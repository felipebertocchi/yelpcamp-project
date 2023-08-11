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
            res.status(200).json({ notif: { title: "Review submitted", msg: "Successfully added a new review" } });
        } catch (error) {
            res.status(500).json({ notif: { title: "Review submittion failed", msg: "There was an error processing your review" }, error });
        }
    },
    deleteReview: async (req, res) => {
        try {
            const { id, reviewId } = req.params;
            await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
            await Review.findByIdAndDelete(reviewId);
            res.status(200).json({ notif: { msg: "Successfully deleted your review" } });
        } catch (error) {
            res.status(500).json({ notif: { msg: "There was an error deleting your review" }, error });
        }
    }
}