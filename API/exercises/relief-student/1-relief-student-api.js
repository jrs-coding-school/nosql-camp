/*jshint esversion: 6 */

const http = require('http');
const app = require('express')();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = http.createServer(app);
server.listen(port, () => console.log('opened server on', server.address()));
 
