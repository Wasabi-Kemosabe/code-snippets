import axios from 'axios';

function getAll() {
    const url = process.env.REACT_APP_NODE_API_BASE + 'workshopsevents/';
    const config = {
        method: 'get',
        withCredentials: true
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

function getAllPagination(pageIndex, pageSize) {
    const url = process.env.REACT_APP_NODE_API_BASE + 'workshopsevents/' + pageIndex + '/' + pageSize;
    const config = {
        method: 'get',
        withCredentials: true
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

function getById(id) {
    const url = process.env.REACT_APP_NODE_API_BASE + 'workshopsevents/' + id;
    const config = {
        method: 'get',
        withCredentials: true
    };
    return axios(url, config)
        .then(individualResponseSuccessHandler)
        .catch(responseErrorHandler);
}

function create(data) {
    const url = process.env.REACT_APP_NODE_API_BASE + 'workshopsevents/';
    const config = {
        method: 'post',
        withCredentials: true,
        data: data
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

function edit(id, data) {
    const url = process.env.REACT_APP_NODE_API_BASE + 'workshopsevents/' + id;
    const config = {
        method: 'put',
        withCredentials: true,
        data: data
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

function deleteWorkshopEvent(id) {
    const url = process.env.REACT_APP_NODE_API_BASE + 'workshopsevents/' + id;
    const config = {
        method: 'delete',
        withCredentials: true
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler)
}

const responseSuccessHandler = response => {
    console.log(response.data.items);
    return response.data.items;
};

const individualResponseSuccessHandler = response => {
    console.log(response.data.item);
    return response.data.item;
};

const responseErrorHandler = error => {
    console.log(error);
    return Promise.reject(error);
};

export { getAll, getById, create, edit, deleteWorkshopEvent, getAllPagination };
