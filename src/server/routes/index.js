const express = require('express');
const path = require('path');

const routes = express.Router();

routes.use('/whoismy', require('./whoismy'));
routes.use('/starwars', require('./starwars'));

routes.get('/', (req, res) => {
    //this sendFile doesn't work currently - may need to run shell at elevated level
    //res.sendFile(path.join(__dirname, '../../../dist/index.html'));

    res.status(200).json({ message: 'root path' });
});

module.exports = routes;
