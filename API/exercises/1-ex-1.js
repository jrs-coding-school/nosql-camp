/*jshint esversion: 6 */

////////////////////////////////////////////////////
//        Different content-type and routes
////////////////////////////////////////////////////

// $ PORT=4000 node API/1-demo-3.js
const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;
const path = require('path');

var server = http.createServer(function(request, response) {

    if (request.method === 'GET' && request.url === '/persons') {

        // set the status and headers before you start writing chunks of data to the body.
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        const responseBody = [{
           id: 2,
           firstName: "Jimmy",
           lastName: "Martin",
           phone: "404 394-2479",
           email: "JimmyMartinJr@gmail.com",
           type: "person",
           active: true
        }, {
           id: 3,
           firstName: "Frank",
           lastName: "Jeffries",
           phone: "303 222-1719",
           email: "frankj1000@gmail.com",
           type: "person",
           active: true
        }, {
           id: 4,
           firstName: "Judy",
           lastName: "Smith",
           phone: "843 399-1444",
           email: "JudySmith@gmail.com",
           type: "person",
           active: true
        }]
            // writing a response body out to the client using a writeable stream
            // write the response to the stream
            // This sends a chunk of the response body.
            //  This method may be called multiple times to provide successive parts of the body.
        response.write(JSON.stringify(responseBody));
        response.end();

    } else {
        response.statusCode = 404;
        response.end();
    }
});

server.listen(port, () => console.log('opened server on', server.address()));
// listen callback demo option 2
//server.listen(port, summary(server));
