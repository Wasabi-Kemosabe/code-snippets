const Joi = require('joi');

const schema = {
    id: Joi.number(),
    password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)
        .required()
};

module.exports = Joi.object().keys(schema);
