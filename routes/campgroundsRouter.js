const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const validateCampground = require('../middleware/validateCampground');
const authUser = require('../middleware/authUser');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);


router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}))

router.get('/new', authUser, (req, res) => {
    res.render('campgrounds/new');
})

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground
        .findById(id)
        .populate('reviews')
        .populate('author')
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
                model: 'User'
            }
        });
    if (!campground) {
        req.flash('error', 'The requested campground was not found');
        res.redirect(`/campgrounds`);
    }
    campground._doc.createdAt = dayjs(campground.createdAt).fromNow();
    res.render('campgrounds/details', { campground });
}))

router.get('/:id/edit', authUser, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'The requested campground was not found');
        res.redirect(`/campgrounds`);
    }
    res.render('campgrounds/edit', { campground });
}))

router.post('/', authUser, validateCampground, catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Succesfully added a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.put('/:id', authUser, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Succesfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', authUser, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Succesfully deleted campground');
    res.redirect('/campgrounds');
}))

module.exports = router;