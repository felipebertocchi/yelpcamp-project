const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { authUser, isCampAuthor, validateCampground } = require('../middleware');
const campgroundsController = require('../controllers/campgroundsController');

router.route('/')
    .get(catchAsync(campgroundsController.index))
    .post(authUser, validateCampground, catchAsync(campgroundsController.postNewCampground));

router.get('/new', authUser, campgroundsController.getNewCampgroundForm);

router.route('/:id')
    .get(catchAsync(campgroundsController.getCampground))
    .put(authUser, isCampAuthor, validateCampground, catchAsync(campgroundsController.updateCampground))
    .delete(authUser, isCampAuthor, catchAsync(campgroundsController.deleteCampground));

router.get('/:id/edit', authUser, isCampAuthor, catchAsync(campgroundsController.getEditCampgroundForm));

module.exports = router;