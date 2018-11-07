const passwordResetService = require('../services/password-reset.service');
const responses = require('../models/responses');

const update = (req, res) => {
    const id = req.params.id;
    const body = req.model;
    const promise = passwordResetService.update(id, body);
    promise
        .then(response => {
            console.log(response);
            const responseObj = new responses.SuccessResponse();
            res.status(200).json(responseObj);
        })
        .catch(error => {
            const responseObj = new responses.ErrorResponse();
            responseObj.errors = error.stack;
            res.status(500).send(responseObj);
        });
    return promise;
};

module.exports = { update };
