const compression = require('compression');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 80;

app.use('/client', express.static('client'));

require('./server/routes.js')(app);

http.listen(port, function () {

    console.log('listening on: ' + port);

});