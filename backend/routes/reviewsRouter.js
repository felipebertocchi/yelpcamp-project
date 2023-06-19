const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { authUser, isReviewAuthor, validateReview } = require('../middleware');
const reviewsController = require('../controllers/reviewsController');

router.post('/', authUser, validateReview, catchAsync(reviewsController.postNewReview));
router.delete('/:reviewId', authUser, isReviewAuthor, catchAsync(reviewsController.deleteReview));

module.exports = router;