/*jshint esversion: 6 */

// $ PORT=4000 node API/1-demo-X.js

////////////////////////////////////////////
//  Adding Express as an request handler
//  Respond to all (*) HTTP GET events
////////////////////////////////////////////

const http = require('http');
const app = require('express')();
//const summary = require('server-summary');  //Log basic server information after an http server start.
const port = process.env.PORT || 3000;

// When an HTTP request hits the server, node calls the request handler function
// with a few handy objects for dealing with the transaction: request and response.
app.get('*', (req, res) => res.send({
    WhatUp: "Im listening to all your requests..."
}))

// Any node web server application will at some point have to create a web server object.
// This is done by using createServer.

// The function that's passed in to createServer is called once for every HTTP request
//  that's made against that server, so it's called the request handler.
var server = http.createServer(app);

// In order to actually serve requests, the listen method needs
//  to be called on the server object using the port number and some options
//  such as the callback.

// listen callback demo option 1
server.listen(port, () => console.log('opened server on', server.address()));
// listen callback demo option 2
//server.listen(port, summary(server));
