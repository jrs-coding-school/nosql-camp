/*jshint esversion: 6 */

// $ PORT=4000 node API/1-ex-99.js

////////////////////////////////////////////
//  Adding Express as an request handler
//  SEND JSON DATA for specific HTTP GET requests
////////////////////////////////////////////

const http = require('http');
const app = require('express')();
const summary = require('server-summary');  //Log basic server information after an http server start.
const port = process.env.PORT || 3000;

app.get('/', function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    // create a response containing some of the request information.
    var responseMessage = { whatup: "Boot Camp API Fun!"};

    // write the response to the stream
    // This sends a chunk of the response body.
    //  This method may be called multiple times to provide successive parts of the body.
    response.write(JSON.stringify(responseMessage));
    response.end();
});


app.get('/commonsections', function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    // create a response containing some of the request information.
    var commonSections = [
        'Introduction',
        'Background',
        'Features',
        'Thoughts',
        'References'
    ]

    // write the response to the stream
    // This sends a chunk of the response body.
    //  This method may be called multiple times to provide successive parts of the body.
    response.write(JSON.stringify(commonSections));
    response.end();
});



app.get('/guide', function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    var commonSections = [
        'Introduction',
        'Background',
        'Features',
        'Thoughts',
        'References'
    ]

    var guide = {
        title: 'Toms Guide to the Web Platform',
        introduction: 'Add in your words a description about this guide',
        background: 'I writing because Trip made me.',
        sections: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        html: {
            sections: commonSections,
            introduction: {
                description: 'Foo',
                contents: []
            }
        },
        css: {
            sections: commonSections
        },
        javascript: {
            sections: commonSections
        }
    }

    // write the response to the stream
    // This sends a chunk of the response body.
    //  This method may be called multiple times to provide successive parts of the body.
    response.write(JSON.stringify(guide));
    response.end();
});

var server = http.createServer(app);

server.listen(port, summary(server));
