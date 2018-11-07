import axios from 'axios';

export function edit(id, data) {
    const url = process.env.REACT_APP_NODE_API_BASE + 'passwordreset/' + id;
    const config = {
        method: 'PUT',
        withCredentials: true,
        data: data
    };
    return axios(url, config)
        .then(responseSuccessHandler)
        .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
    console.log(response.data.items);
    return response.data.items;
};

const responseErrorHandler = error => {
    console.log(error);
    return Promise.reject(error);
};
