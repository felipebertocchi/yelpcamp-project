const BaseJoi = require('joi');
const sanitize = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitize(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const Joi = BaseJoi.extend(extension)

module.exports = {
    campgroundSchema: Joi.object({
        campground: Joi.object({
            title: Joi.string().required().escapeHTML(),
            description: Joi.string().required().escapeHTML(),
            location: Joi.string().required().escapeHTML(),
            price: Joi.number().required().min(0),
            contact: Joi.object({
                phone: Joi.string().allow('').optional(),
                email: Joi.string().email().allow('').optional(),
                includeAccContact : Joi.boolean(),
            }),
            amenities: Joi.array(),
            activities: Joi.array(),
        }).required(),
        deleteImages: Joi.array()
    }),
    reviewSchema: Joi.object({
        review: Joi.object({
            body: Joi.string().required().escapeHTML(),
            rating: Joi.number().required().min(1).max(5),
        }).required()
    })
};