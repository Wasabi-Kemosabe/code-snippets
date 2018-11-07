const workshopsEventsService = require('../services/workshopsevents.service');
const responses = require('../models/responses');

const selectAll = (req, res) => {
    const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
    const pageSize = req.params.pageSize || req.query.pageSize || 5;
    const promise = workshopsEventsService.selectAll(pageIndex, pageSize);
    promise
        .then(response => {
            const responseObj = new responses.ItemsResponse(response);
            responseObj.items = response;
            res.status(200).json(responseObj)
        })
        .catch(error => {
            const responseObj = new responses.ErrorResponse();
            responseObj.errors = error.stack;
            res.status(500).send(responseObj);
        });
    return promise;
};

const selectById = (req, res) => {
    const id = req.params.id;
    const promise = workshopsEventsService.selectById(id);
    promise
        .then(response => {
            const responseObj = new responses.ItemResponse();
            responseObj.item = response[0];
            res.status(200).json(responseObj);
        })
        .catch(error => {
            const responseObj = new responses.ErrorResponse();
            responseObj.errors = error.stack;
            res.status(500).send(responseObj);
        });
    return promise;
};

const update = (req, res) => {
    const id = req.params.id;
    const body = req.model;
    const promise = workshopsEventsService.update(id, body);
    promise
        .then(response => {
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

const create = (req, res) => {
    const promise = workshopsEventsService.create(req.model);
    promise
        .then(response => {
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

const deleteWorkshopEvent = (req, res) => {
    const id = req.params.id;
    const promise = workshopsEventsService.deleteWorkshopEvent(id);
    promise
        .then(response => {
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

module.exports = { selectAll, selectById, update, create, deleteWorkshopEvent };
