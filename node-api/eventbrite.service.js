const axios = require('../../node_modules/axios');

function getAll() {
    // const url = 'https://www.eventbriteapi.com/v3/users/me/owned_events/';
    // URL below is for testing purposes only.  Please comment line when finished.
    const url = 'https://www.eventbriteapi.com/v3/events/search?q=los+angeles&sort_by=date';
    const config = {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
        }
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

function getById(id) {
    const url = 'https://www.eventbriteapi.com/v3/events/' + id + '/';
    const config = {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
        }
    }
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

function create(data) {
    const url = 'https://www.eventbriteapi.com/v3/organizations/273664181943/events/';
    const config = {
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
        },
        data: data
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

function update(id, data) {
    const url = 'https://www.eventbriteapi.com/v3/events/' + id + '/';
    const config = {
        method: 'post',
        headers: {
            'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
        },
        data: data
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

function deleteEvent(id) {
    const url = 'https://www.eventbriteapi.com/v3/events/' + id + '/';
    const config = {
        method: 'delete',
        headers: {
            'Authorization': 'Bearer ' + process.env.EVENTBRITE_KEY
        }
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
    return response;
};

const responseErrorHandler = error => {
    console.log(error);
    if (error && error.response && error.response.data && error.response.data.errors) {
        console.error(error.response.data.errors);
    }
    return Promise.reject(error);
};

module.exports = { getAll, getById, create, update, deleteEvent }; s = { getAll, getById, create, update, deleteEvent };
