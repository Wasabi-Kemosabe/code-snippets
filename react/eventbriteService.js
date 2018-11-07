import axios from 'axios';

function postActivity(data){
    const url =process.env.REACT_APP_NODE_API_BASE + "activity";
    const config = {
        method: "POST",
        data: data
    }
    const promise = axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler)
    return promise;
}

function getAll() {
    const url = process.env.REACT_APP_NODE_API_BASE + 'eventbrite';
    const config = {
        method: 'get',
        withCredentials: true
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

function getByOrganizerId(){
    const url="/api/eventbrite/org-id";

    return axios.get(url)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

function getAllInternalEvents(){
    const url="/api/eventbrite";

    return axios.get(url)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

function getByUserId(id){
    const url="/api/eventbrite/user-id/"+id;

    return axios.get(url)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

function getById(id) {
    const url = process.env.REACT_APP_NODE_API_BASE + "eventbrite/" + id;

    return axios.get(url)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

function getUserByDetailsId(id) {
    const url = process.env.REACT_APP_NODE_API_BASE + "eventbrite/" + id;

    return axios.get(url)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
    console.log(response.data.items);
    return response.data.items;
};

const responseErrorHandler = error => {
    if (error && error.response && error.response.data && error.response.data.errors) {
        console.error(error.response.data.errors);
    } else {
        console.error(error);
    }
    return Promise.reject(error);
};

export { getAll, getByOrganizerId, getByUserId, getAllInternalEvents
    
    , getById, postActivity };
