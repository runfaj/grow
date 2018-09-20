const express = require('express');
const request = require('request-promise');
const routes = express.Router();

//Note! I'm aware that there is a swapi-node package to make this easier, but that
//defeats some of the purpose of showing how you might do this without a helper package.

routes.get('/people',
    getPeople,
    jsonResponse
);
routes.get('/planets',
    getPlanets,
    jsonResponse
);
module.exports = routes;

function getPeople(req, res, next) {
    //get all people from https://swapi.co/api/people
    let sortBy = req.query.sortBy;
    let data = [];

    getAllResults('https://swapi.co/api/people', data).then((data)=>{
        //could limit to specific keys, but just letting any key with a string to be a possible sort by
        if(data[0] && sortBy && typeof data[0][sortBy] === 'string') {
            data.sort((a, b)=>{
                if(a[sortBy] < b[sortBy]) return -1;
                if(a[sortBy] > b[sortBy]) return 1;
                return 0;
            });
        }

        res.send({'results': data});
    });
}

function getPlanets(req, res, next) {
    let data = [];

    getAllResults('https://swapi.co/api/planets', data).then((data)=>{
        getAllPersonNames(data).then((hash)=>{
            data.forEach((dataRow, dataI)=>{
                if(dataRow.residents)
                    dataRow.residents.forEach((linkRow, linkI)=>{
                        data[dataI].residents[linkI] = hash[linkRow];
                    });
            });

            res.send({'results': data});
        });

    });
}

function getAllResults(url, data) {
    //recursive function to get all results for a url. Recurses if "next" param in response is present

    return request(url)
        .then((body)=>{
            const json = JSON.parse(body);

            data.push.apply(data, json.results);

            if(json.next) return getAllResults(json.next, data);
            else return data;
        })
        .catch((err)=>{
            console.log(err || 'invalid request');
        });
}

function getAllPersonNames(dataSet) {
    // this creates a list of all unique links and does a promise set to get them all

    let personNameHash = {}; //link: name

    dataSet.forEach((data)=>{
        if(data.residents)
            data.residents.forEach((link)=>{
                if(!personNameHash[link])
                    personNameHash[link] = "";
            });
    });

    let promises = [];
    Object.keys(personNameHash).forEach((link)=>{
        promises.push(
            request(link)
                .then((resp)=>{
                    personNameHash[link] = JSON.parse(resp).name;
                })
                .catch((err)=>{
                    console.log(err || 'invalid request');
                })
        );
    });

    return Promise.all(promises).then(()=>{
        return personNameHash;
    });
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
