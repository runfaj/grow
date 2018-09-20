const express = require('express');
const request = require('request');
const routes = express.Router();

routes.get('/representatives/:state',
    findRepresentativesByState,
    jsonResponse
);
routes.get('/senators/:state',
    findSenatorsByState,
    jsonResponse
);
module.exports = routes;


function findRepresentativesByState(req, res, next) {
    const url = `http://whoismyrepresentative.com/getall_reps_bystate.php?state=${req.params.state}&output=json`;
    request(url, handleApiResponse(res, next));
}

function findSenatorsByState(req, res, next) {
    const url = `http://whoismyrepresentative.com/getall_sens_bystate.php?state=${req.params.state}&output=json`;
    request(url, handleApiResponse(res, next));
}

function handleApiResponse(res, next) {
    return (err, response, body) => {
        if (err || body[0] === '<') {
            res.locals = {
                success: false,
                error: err || 'Invalid request. Please check your state variable.'
            };
            return next();
        }
        res.locals = {
            success: true,
            results: JSON.parse(body).results
        };
        return next();
    };
}

function jsonResponse(req, res, next) {
    return res.json(res.locals);
}
