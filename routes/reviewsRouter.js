const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const validateReview = require('../middleware/validateReview');
const authUser = require('../middleware/authUser');
const isReviewAuthor = require('../middleware/isReviewAuthor');


router.post('/', authUser, validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review({ ...req.body.review, campground });
    review.author = req.user._id;
    campground.reviews.push(review)
    await review.save();
    await campground.save();
    req.flash('success', 'Succesfully added a new review');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', authUser, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Succesfully deleted review');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;