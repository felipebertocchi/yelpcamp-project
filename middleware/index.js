const authUser = require('./authUser');
const isCampAuthor = require('./isCampAuthor');
const isReviewAuthor = require('./isReviewAuthor');
const storeReturnTo = require('./storeReturnTo');
const validateCampground = require('./validateCampground');
const validateReview = require('./validateReview');

module.exports = {
    authUser,
    isCampAuthor,
    isReviewAuthor,
    storeReturnTo,
    validateCampground,
    validateReview
}