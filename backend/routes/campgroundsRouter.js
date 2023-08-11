const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isCampAuthor, validateCampground } = require('../middleware');
const campgroundsController = require('../controllers/campgroundsController');
const multer = require('multer');
const { storage } = require('../cloudinary');
const { verifyJwt } = require('../auth');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgroundsController.index))
    .post(verifyJwt, upload.array('images'), validateCampground, catchAsync(campgroundsController.postNewCampground));
    // TODO Refactor middleware to use validate before multer

router.route('/:id')
    .get(catchAsync(campgroundsController.getCampground))
    .put(verifyJwt, isCampAuthor, upload.array('images'), validateCampground, catchAsync(campgroundsController.updateCampground))
    // TODO Refactor middleware to use validate before multer
    .delete(verifyJwt, isCampAuthor, catchAsync(campgroundsController.deleteCampground));

module.exports = router;