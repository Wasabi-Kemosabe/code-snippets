const responses = require('../models/responses/index');
const eventbriteService = require('../services/eventbrite.service');
const activityService = require('../services/activity.service');
const ACTIVITY_TYPES = require('../enums/activityTypes'); 

const getAll = (req, res) => {
    const promise = eventbriteService.getAll();
    promise
        .then(response => {
            const responseObj = new responses.ItemsResponse(response.data);
            responseObj.items = response.data.events;
            responseObj.pagination = response.data.pagination;
            return res.status(200).json(responseObj);
        })
        .catch(error => {
            const responseObj = new responses.ErrorResponse();
            responseObj.errors = error.stack;
            res.status(500).send(responseObj);
        })
};

const getById = (req, res) => {
    let event;
    const promise = eventbriteService.getById(req.params.id);
    promise
        .then(response => {
            event = response.data;

            const activityObj = {
                userId: req.auth.id, 
                activityTypeId: ACTIVITY_TYPES.EVENT_DETAIL_VIEWED, 
                detail: JSON.stringify({
                    name: response.data.name.text,
                    eventId: response.data.id
                })
            }
            const promise2 = activityService.post(activityObj)
            return promise2;
        })
        .then(() => {
            const data = event
            const responseObj = new responses.ItemsResponse(data);
            res.status(200).json(responseObj);
        })
        .catch(error => {
            const responseObj = new responses.ErrorResponse();
            responseObj.errors = error.stack;
            res.status(500).send(responseObj);
        })
}

const create = (req, res) => {
    const promise = eventbriteService.create(req.body);
    promise
        .then(response => {
            const responseObj = new responses.SuccessResponse();
            res.status(200).json(responseObj);
        })
        .catch(error => {
            const responseObj = new responses.ErrorResponse();
            responseObj.errors = error.stack;
            res.status(500).send(responseObj);
        })
}

const update = (req, res) => {
    const promise = eventbriteService.update(req.params.id, req.body);
    promise
        .then(response => {
            const responseObj = new responses.SuccessResponse();
            res.status(200).json(responseObj);
        })
        .catch(error => {
            const responseObj = new responses.ErrorResponse();
            responseObj.errors = error.stack;
            res.status(500).send(responseObj);
        })
}

const deleteEvent = (req, res) => {
    const promise = eventbriteService.deleteEvent(req.params.id);
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



module.exports = { getAll, getById, create, update, deleteEvent };
