const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { authUser, isCampAuthor, validateCampground } = require('../middleware');
const campgroundsController = require('../controllers/campgroundsController');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgroundsController.index))
    .post(authUser, upload.array('images'), validateCampground, catchAsync(campgroundsController.postNewCampground));
    // TODO Refactor middleware to use validate before multer

router.route('/:id')
    .get(catchAsync(campgroundsController.getCampground))
    .put(authUser, isCampAuthor, upload.array('images'), validateCampground, catchAsync(campgroundsController.updateCampground))
    // TODO Refactor middleware to use validate before multer
    .delete(authUser, isCampAuthor, catchAsync(campgroundsController.deleteCampground));

module.exports = router;