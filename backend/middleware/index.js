const authUser = require('./authUser');
const isCampAuthor = require('./isCampAuthor');
const isReviewAuthor = require('./isReviewAuthor');
const validateCampground = require('./validateCampground');
const validateReview = require('./validateReview');

module.exports = {
    authUser,
    isCampAuthor,
    isReviewAuthor,
    validateCampground,
    validateReview
}