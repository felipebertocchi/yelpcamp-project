const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { isReviewAuthor, validateReview } = require('../middleware');
const reviewsController = require('../controllers/reviewsController');
const { verifyJwt } = require('../auth');

router.post('/', verifyJwt, validateReview, catchAsync(reviewsController.postNewReview));
router.delete('/:reviewId', verifyJwt, isReviewAuthor, catchAsync(reviewsController.deleteReview));

module.exports = router;