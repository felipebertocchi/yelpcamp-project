const Campground = require("../models/campground");

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author?.equals(req.user._id)) {
        return res.status(401).json({ message: "You do not have permission to do that", error });
    } else {
        next();
    }
}