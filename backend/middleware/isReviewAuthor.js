const Review = require("../models/review");

module.exports = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author?.equals(req.user._id)) {
        return res.status(401).json('You do not have permission to do that'); 
    } else {
        next();
    }
}