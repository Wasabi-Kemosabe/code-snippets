const mssql = require('../../mssql');
const { TYPES } = require('tedious');

const update = (id, body) => {
    return mssql
        .executeProc('Users_ResetPassword', request => {
            request.addParameter('Id', TYPES.Int, id);
            request.addParameter('Password', TYPES.NVarChar, body.password);
        })
        .then(response => {
            return response.outputParameters;
        })
        .catch(responseErrorHandler)
};

const responseErrorHandler = error => {
    console.log(error);
    return Promise.reject(error);
};

module.exports = { update };
