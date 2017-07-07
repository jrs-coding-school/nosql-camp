/*jshint esversion: 6 */

////////////////////////////////////////////
//  Simple http server and request handler
////////////////////////////////////////////

// $ PORT=4000 node API/demos/1-demo-1.js
// Load individual modules with the require().
// While many modules must be downloaded, some modules, such as http
//  are included with Node.js installations.
const http = require('http')

// A network port is a process-specific or an application-specific software construct
// serving as a communication endpoint, used by the Transport Layer protocols
// of Internet Protocol suite, such as Transmission Control Protocol (TCP).
const port = process.env.PORT || 3000

// Any node web server application will at some point have to create a web server object.
// This is done by using the createServer function.

// pass a request handler (callback function) to createServer()

// The function that's passed in to createServer is called once for every HTTP request
//  that's made against that server, so it's called the request handler.
// When an HTTP request hits the server, node calls the request handler function
// with a few handy objects for dealing with the request and response.
var server = http.createServer(function(request, response) {
  // grab the request headers, method and URL
  var headers = request.headers
  var method = request.method
  var url = request.url

  // the response object is a WritableStream,
  // https://nodejs.org/api/http.html#http_class_http_serverresponse

  // Sends a response header to the request. The status code is a
  //   3-digit HTTP status code, like 404 or 200.
  //     The last argument, headers, are the response headers.
  //
  // Here we return a 200 (OK) HTTP status code
  //  and the content-type... we're sending json back to the client, so....
  response.writeHead(200, {
    'Content-Type': 'application/json'
  })

  // create a response containing some of the request information.
  var responseBody = {
    headers: headers,
    method: method,
    url: url
  }

  // write the response to the stream
  // This sends a chunk of the response body.
  //  This method may be called multiple times to provide successive parts of the body.
  response.write(JSON.stringify(responseBody))
  console.log(
    "Here's what were sending the client: ",
    JSON.stringify(responseBody)
  )
  response.end()
})

// In order to actually serve requests, the listen method needs
//  to be called on the server object using the port number and some options
//  such as the callback.

// listen callback demo option 1
//server.listen(port, () => console.log('opened server on', server.address(), "port: ", port));

server.listen(port, function() {
  console.log('opened server on', server.address(), 'port: ', port)
})

// listen callback demo option 2
//server.listen(port, summary(server));
