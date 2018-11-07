const Joi = require('joi');

const schema = {
    id: Joi.number(),
    title: Joi.string()
        .min(2)
        .max(200)
        .required(),
    host: Joi.string()
        .min(2)
        .max(200)
        .required(),
    description: Joi.string()
        .min(2)
        .max(4000)
        .required(),
    addressId: Joi.number()
        .integer()
        .required(),
    startTime: Joi.date()
        .iso()
        .required(),
    endTime: Joi.date()
        .iso()
        .required(),
    url: Joi.string()
        .min(2)
        .max(3000)
        .required(),
    imageUrl: Joi.string()
        .min(2)
        .max(3000)
        .regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g)
        .error(new Error('Image URL must have an extension of jpg, gif, or png.'))
        .required(),
    isRegistered: Joi.boolean()
        .required()
};

module.exports = Joi.object().keys(schema);
