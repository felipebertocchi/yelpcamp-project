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
        const { page = 1, limit = 12, search = '', sort } = req.query;
        let sorted = {};
        if (sort) {
            if (sort.includes("desc")) {
                sorted = { [sort.split("-")[0]]: -1 }
            } else {
                sorted = { [sort]: 1 }
            }
        }
        const searchRegex = new RegExp(search, 'i');
        try {
            const campgrounds = await Campground
                .find({ title: searchRegex })
                .sort(sorted)
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Campground.countDocuments({ title: searchRegex });

            const pages = Math.ceil(total / limit);

            return res.status(200).json({ campgrounds, total, currentPage: page, pages, limit, searchValue: search });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'There was an error trying to retrieve the campgrounds', error });
        }
    },
    getNewCampgroundForm: (req, res) => {
        res.render('campgrounds/new');
    },
    getCampground: async (req, res) => {
        const { id } = req.params;
        try {
            const campground = await Campground
                .findById(id)
                .populate('author')
                .populate({
                    path: 'reviews',
                    options: { sort: [[['createdAt', 'desc']]] },
                    populate: {
                        path: 'author',
                        model: 'User',
                    }
                });
            campground._doc.createdAt = dayjs(campground.createdAt).fromNow();
            campground._doc.reviews.forEach(review => {
                review._doc.createdAt = dayjs(review.createdAt).fromNow();
            });
            return res.status(200).json(campground);
        } catch (error) {
            return res.status(500).json({ message: 'There was an error trying to retrieve the campground' });
        }
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
        try {
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
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({ title: "Geolocation error", message: "There was an error processing the location of your campground", err });
                });
            await campground.save();
            return res.status(200).json({ message: "Succesfully added a new campground", campground })
        } catch (error) {
            return res.status(500).json({ message: "There was an error processing the data", error })
        }
    },
    updateCampground: async (req, res) => {
        const { id } = req.params;
        try {
            const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
            if (req.body.deleteImages) {
                for (const filename of req.body.deleteImages) {
                    if (filename.includes("YelpCamp")) await cloudinary.uploader.destroy(filename);
                }
                await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
            }
            campground.images.push(...req.files.map(file => ({ url: file.path, filename: file.filename })));
            if (campground.location !== req.body.campground.location) {
                await geocodingClient.forwardGeocode({
                    query: req.body.campground.location,
                    limit: 1
                })
                    .send()
                    .then(response => {
                        campground.geometry = response.body.features[0].geometry;
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({ title: "Geolocation error", message: "There was an error processing the location of your campground", err });
                    });
            }
            await campground.save();
            return res.status(200).json({ message: "Succesfully updated campground", campground })
        } catch (error) {
            return res.status(500).json({ message: "There was an error processing the data", error })
        }
    },
    deleteCampground: async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash('success', 'Succesfully deleted campground');
        res.redirect('/campgrounds');
    }
}