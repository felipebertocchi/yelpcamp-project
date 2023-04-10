const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const validateCampground = require('../middleware/validateCampground');


router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
})

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    if (!campground) {
        req.flash('error', 'The requested campground was not found');
        res.redirect(`/campgrounds`);
    }
    res.render('campgrounds/details', { campground });
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'The requested campground was not found');
        res.redirect(`/campgrounds`);
    }
    res.render('campgrounds/edit', { campground });
}))

router.post('/', validateCampground, catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Succesfully added a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Succesfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Succesfully deleted campground');
    res.redirect('/campgrounds');
}))

module.exports = router;