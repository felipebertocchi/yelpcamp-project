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
                phone: Joi.string(),
                email: Joi.string().email(),
                includeAccContact : Joi.boolean(),
            }),
            amenities: Joi.array().items(Joi.object({
                name: Joi.string().required().escapeHTML(),
                active: Joi.boolean().required(),
            })),
            activities: Joi.array().items(Joi.object({
                name: Joi.string().required().escapeHTML(),
                active: Joi.boolean().required(),
            })),
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