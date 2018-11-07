const mssql = require('../../mssql');
const { TYPES } = require('tedious');

const selectAll = (pageIndex, pageSize) => {
    const promise = mssql.executeProc('WorkshopsEvents_SelectAll_Paged', request => {
        request.addParameter('PageIndex', TYPES.Int, pageIndex);
        request.addParameter('PageSize', TYPES.Int, pageSize);
    })
        .then(response => {
            const totalCount = (response.resultSets && response.resultSets[1] && response.resultSets[1][0] && response.resultSets[1][0].totalCount) || 0;
            const totalPages = Math.ceil(totalCount / pageSize);
            const items = {
                pagedItems: response.resultSets[1],
                pageIndex: pageIndex,
                pageSize: pageSize,
                totalCount: totalCount,
                totalPages: totalPages
            };
            return items;
        })
        .catch(responseErrorHandler);
    return promise;
};

const selectById = id => {
    const promise = mssql
        .executeProc('WorkshopsEvents_SelectById', request => {
            request.addParameter('Id', TYPES.Int, id);
        })
        .then(response => {
            return response.resultSets[1];
        })
        .catch(responseErrorHandler);
    return promise;
};

const update = (id, body) => {
    return mssql
        .executeProc('WorkshopsEvents_Update', request => {
            request.addParameter('Id', TYPES.Int, id);
            request.addParameter('Title', TYPES.NVarChar, body.title);
            request.addParameter('Host', TYPES.NVarChar, body.host);
            request.addParameter('Description', TYPES.NVarChar, body.description);
            request.addParameter('AddressId', TYPES.Int, body.addressId);
            request.addParameter('StartTime', TYPES.DateTime2, body.startTime);
            request.addParameter('EndTime', TYPES.DateTime2, body.endTime);
            request.addParameter('Url', TYPES.NVarChar, body.url);
            request.addParameter('ImageUrl', TYPES.NVarChar, body.imageUrl);
            request.addParameter('IsRegistered', TYPES.Bit, body.isRegistered);
        })
        .then(response => {
            return response.outputParameters;
        })
        .catch(responseErrorHandler)
};

const create = body => {
    return mssql
        .executeProc('WorkshopsEvents_Insert', request => {
            request.addParameter('Title', TYPES.NVarChar, body.title);
            request.addParameter('Host', TYPES.NVarChar, body.host);
            request.addParameter('Description', TYPES.NVarChar, body.description);
            request.addParameter('AddressId', TYPES.Int, body.addressId);
            request.addParameter('StartTime', TYPES.DateTime2, body.startTime);
            request.addParameter('EndTime', TYPES.DateTime2, body.endTime);
            request.addParameter('Url', TYPES.NVarChar, body.url);
            request.addParameter('ImageUrl', TYPES.NVarChar, body.imageUrl);
            request.addParameter('IsRegistered', TYPES.Bit, body.isRegistered);
            request.addParameter('Id', TYPES.Int, null);
        })
        .then(response => {
            return response.outputParameters;
        })
        .catch(responseErrorHandler);
};

const deleteWorkshopEvent = id => {
    const promise = mssql
        .executeProc('WorkshopsEvents_Delete', request => {
            request.addParameter('Id', TYPES.Int, id);
        })
        .then(response => {
            return response.outputParameters;
        })
        .catch(responseErrorHandler);
    return promise;
}

const responseErrorHandler = error => {
    console.log(error);
    return Promise.reject(error);
}

module.exports = { selectAll, selectById, update, create, deleteWorkshopEvent };
