const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('./routes');

app.use(cors());
app.use('/', routes);

const server = app.listen(3000, () => {
    const host = server.address().address,
          port = server.address().port;

    console.log('API listening at http://%s:%s', host, port);
});
