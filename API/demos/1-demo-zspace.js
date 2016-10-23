/*jshint esversion: 6 */

const http = require('http');
const port = process.env.PORT || 4000;
const app = require('express')();
const HTTPError = require('node-http-error');
const cors = require('cors');


app.get('/jt', function(request, response) {
  response.status(200);
  response.set('Content-Type', 'application/json');
  response.send({bio: "Justin Randall Timberlake is an American singer, \
  songwriter, actor and record producer. Born in Memphis, Tennessee, he appeared \
  on the television shows Star Search and The All-New Mickey Mouse Club as a child."});
});


app.get('/jt/awful', function(request, response, next) {
    return next(new HTTPError(500, 'impossible', {message: "Um, there seems to be a problem.  JT is not awful."}));
});


app.use('*', (request, response) => response.send({hello:  "My name is Justin Timberlake."}));

app.use(function (err,req,res,next) {
  res.status(err.status);
  res.set('Content-type','application/json');
  res.send(err);
});


var server = http.createServer(app);
server.listen(port, () => console.log("listening on port: ", port));
