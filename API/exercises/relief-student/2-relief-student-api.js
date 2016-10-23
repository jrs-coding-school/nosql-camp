/*jshint esversion: 6 */

const http = require('http');
const app = require('express')();
const port = process.env.PORT || 3000;
const HTTPError = require('node-http-error');

app.get('/', function(req, res) {
    res.send('Hello World!');
});


app.get('/bad', function(req, res, next) {
    next(new HTTPError(400, "You called the /bad route.  That's bad.", {
        "developerMessage": "Verbose, plain language description of the problem for the app developer with hints about how to fix it.",
        "userMessage": "Pass this message on to the app user if needed.",
        "appErrorCode": 12345,
        "more info": "http://dev.superapp.com/errors/12345"
    }));
});


//////////////////////
//   Error handler
//////////////////////
app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err);
    res.status(err.status || 500);
    res.send(err);
});

var server = http.createServer(app);
server.listen(port, () => console.log('opened server on', server.address()));
