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

    if (request.method === 'GET' && request.url === '/cats') {

        // set the status and headers before you start writing chunks of data to the body.
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        const responseBody = [{
                    id: 1,
                    animalType: "cat",
                    breed: "Pixie-bob",
                    desc: "The Pixie-bob is a breed of domestic cat claimed by breed founder Carol Ann Brewer of Washington State to be the progeny of naturally occurring bobcat hybrids."
                }, {
                    id: 2,
                    animalType: "cat",
                    breed: "Manx",
                    desc: "The Manx cat, is a breed of domestic cat originating on the Isle of Man, with a naturally occurring mutation that shortens the tail."
                }, {
                    id: 3,
                    animalType: "cat",
                    breed: "Maine Coon",
                    desc: "The Maine Coon is the largest domesticated breed of cat. It has a distinctive physical appearance and valuable hunting skills."
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
