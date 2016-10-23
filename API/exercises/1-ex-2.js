/*jshint esversion: 6 */

// $ PORT=4000 node API/1-ex-2.js

////////////////////////////////////////////
//  Adding Express as an request handler
//  Respond to all (*) HTTP GET events
////////////////////////////////////////////

const http = require('http');
const app = require('express')();
const port = process.env.PORT || 3000;

app.get('/cats/:id/toys/:toyID', (req, res) => res.send(req.params))
var server = http.createServer(app);
server.listen(port, () => console.log('opened server on', server.address()));
