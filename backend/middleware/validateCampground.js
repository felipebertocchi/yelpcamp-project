const { campgroundSchema } = require("../schemas")

module.exports = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        return res.status(500).json({ error })
    } else {
        next()
    }
}