const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const validateCampground = require('../middleware/validateCampground');
const authUser = require('../middleware/authUser');
const isCampAuthor = require('../middleware/isCampAuthor');
const campgroundsController = require('../controllers/campgroundsController');

router.get('/', catchAsync(campgroundsController.index));
router.get('/new', authUser, campgroundsController.getNewCampgroundForm);
router.get('/:id', catchAsync(campgroundsController.getCampground));
router.get('/:id/edit', authUser, isCampAuthor, catchAsync(campgroundsController.getEditCampgroundForm));
router.post('/', authUser, validateCampground, catchAsync(campgroundsController.postNewCampground));
router.put('/:id', authUser, isCampAuthor, validateCampground, catchAsync(campgroundsController.updateCampground));
router.delete('/:id', authUser, isCampAuthor, catchAsync(campgroundsController.deleteCampground));

module.exports = router;