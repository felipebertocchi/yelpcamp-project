const Campground = require("../models/campground");
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const { cloudinary } = require('../cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mbxToken });

module.exports = {
    index: async (req, res) => {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', { campgrounds });
    },
    getNewCampgroundForm: (req, res) => {
        res.render('campgrounds/new');
    },
    getCampground: async (req, res) => {
        const { id } = req.params;
        const campground = await Campground
            .findById(id)
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
        campground._doc.reviews.forEach(review => {
            review._doc.createdAt = dayjs(review.createdAt).fromNow();
        });
        res.render('campgrounds/details', { campground });
    },
    getEditCampgroundForm: async (req, res) => {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        if (!campground) {
            req.flash('error', 'The requested campground was not found');
            return res.redirect(`/campgrounds`);
        }
        res.render('campgrounds/edit', { campground });
    },
    postNewCampground: async (req, res) => {
        const campground = new Campground(req.body.campground);
        campground.images = req.files.map(file => ({ url: file.path, filename: file.filename }));
        campground.author = req.user._id;
        await geocodingClient.forwardGeocode({
            query: req.body.campground.location,
            limit: 1
        })
            .send()
            .then(response => {
                campground.geometry = response.body.features[0].geometry;
            })
            .catch(err => console.log(err));
        await campground.save();
        req.flash('success', 'Succesfully added a new campground');
        res.redirect(`/campgrounds/${campground._id}`);
    },
    updateCampground: async (req, res) => {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        if (req.body.deleteImages) {
            for (const filename of req.body.deleteImages) {
                if (filename.includes("YelpCamp")) await cloudinary.uploader.destroy(filename);
            }
            await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        }
        campground.images.push(...req.files.map(file => ({ url: file.path, filename: file.filename })));
        await campground.save();
        req.flash('success', 'Succesfully updated campground');
        res.redirect(`/campgrounds/${campground._id}`);
    },
    deleteCampground: async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash('success', 'Succesfully deleted campground');
        res.redirect('/campgrounds');
    }
}