/*jshint esversion: 6 */

// $ PORT=4000 node API/1-demo-X.js

////////////////////////////////////////////
//  Demo: Error Handling
//   1) Adding error module: node-http-error
//   2) Creating New Errors
//   3) Adding error handling middleware: app.use(function(err, req, res, next) { ... }
////////////////////////////////////////////

const http = require('http');
const app = require('express')();
const HTTPError = require('node-http-error');
const port = process.env.PORT || 3000;

// The function that's passed in to createServer is called once for every HTTP request
//  that's made against that server, so it's called the request handler.

// Any node web server application will at some point have to create a web server object.
// This is done by using createServer.
var server = http.createServer(app);
// When an HTTP request hits the server, node calls the request handler function
// with a few handy objects for dealing with the transaction: request and response.

// Any node web server application will at some point have to create a web server object.
// This is done by using createServer.
app.get('/jt', (req, res) => res.send({
    jtSays: "Bring it on down to omletteville."
}));

// Middleware functions are functions that have access to the request object (req),
// the response object (res), and the next middleware function in the application’s request-response cycle.
// The next middleware function is commonly denoted by a variable named next.



// This example shows a route and its handler function (middleware system).
// The function handles GET requests to the /jt/awful path.
app.get('/jt/awful', function(request, response, next) {
    var jtError = new HTTPError(400, 'impossible', {
        jtSays: "Girl, you know that's not true."
    })
    return next(jtError);
})

// // This example shows a route and its handler function (middleware system).
// // The function handles all GET requests that are not being handled by other routes.
// app.get('*', (req, res) => res.send({
//     About: "Justin Randall Timberlake is an American singer, songwriter, actor and record producer. Born in Memphis, Tennessee, he appeared on the television shows Star Search and The All-New Mickey Mouse Club as a child."
// })
// );

// Define error-handling middleware functions in the same way as
//  other middleware functions,
// except error-handling functions have four arguments instead
//  of three: (err, req, res, next).


app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500);
    res.send(err);
});

// In order to actually serve requests, the listen method needs
//  to be called on the server object using the port number and some options
//  such as the callback.
// listen callback demo option 1
server.listen(port, () => console.log('opened server on', server.address(), " port: ", port));
