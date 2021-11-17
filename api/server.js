const http = require('http');
const app = require('./app');

const apiURL = process.env.APPURL;
const port = process.env.PORT || 6000;

const server = http.createServer(app);
server.listen(port);