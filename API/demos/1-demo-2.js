/*jshint esversion: 6 */

////////////////////////////////////////////////////
// Different content-type and more stream goodness
////////////////////////////////////////////////////

// $ PORT=4000 node API/demos/1-demo-2.js
const http = require('http');
const port = process.env.PORT || 3000;

var server = http.createServer(function (request, response){

  // set the status and headers before you start writing chunks of data to the body.
  response.writeHead(200, {'Content-Type': 'text/html'});

    // writing a response body out to the client using a writeable stream
    response.write('<html>');
    response.write('<body>');
    response.write('<h2>Request Info</h2>');
    response.write('<h3>Method</h2>');
    response.write('<p>' + request.method +'</p>');
    response.write('<h3>Host</h3>');
    response.write('<p>' + request.headers.host +'</p>');
    response.write('<h3>URL</h3>');
    response.write('<p>' + request.url +'</p>');
    response.write('<h3>Browser Info (user-agent)</h3>');
    response.write('<p>' + request.headers['user-agent'] +'</p>');
    response.write('</body>');
    response.write('</html>');
    response.end();
});

// In order to actually serve requests, the listen method needs
//  to be called on the server object using the port number and some options
//  such as the callback.

// listen callback demo option 1
server.listen(port, () => console.log('opened server on', server.address()));
// listen callback demo option 2
 //server.listen(port, summary(server));
