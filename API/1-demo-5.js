/*jshint esversion: 6 */

// $ PORT=4000 node API/1-demo-X.js

////////////////////////////////////////////
//  Demo: Error Handling
//   1) Adding error module: node-http-error
//   2) Throwing New Errors
//   3) Adding error handling middleware: app.use(function(err, req, res, next) { ... }
////////////////////////////////////////////

const http = require('http');
const app = require('express')();
const HTTPError = require('node-http-error');
const port = process.env.PORT || 3000;

// When an HTTP request hits the server, node calls the request handler function
// with a few handy objects for dealing with the transaction: request and response.


// Any node web server application will at some point have to create a web server object.
// This is done by using createServer.

app.get('/jt', (req,res) => res.send({
    jtSays: "Bring it on down to omletteville."
}));

app.get('/jt/awful', function (request, response, next) {
    var jtError = new HTTPError(500, 'impossible', {jtSays: "Girl, you know that's not true."})
    return next(jtError);
})

app.get('*', (req, res) => res.send({
    WhatUp: "Justin Randall Timberlake is an American singer, songwriter, actor and record producer. Born in Memphis, Tennessee, he appeared on the television shows Star Search and The All-New Mickey Mouse Club as a child."
}));
// The function that's passed in to createServer is called once for every HTTP request
//  that's made against that server, so it's called the request handler.
var server = http.createServer(app);

// In order to actually serve requests, the listen method needs
//  to be called on the server object using the port number and some options
//  such as the callback.

app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500);
    res.send(err);
});

// listen callback demo option 1
server.listen(port, () => console.log('opened server on', server.address()));
