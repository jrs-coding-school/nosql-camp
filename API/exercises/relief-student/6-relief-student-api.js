/*jshint esversion: 6 */

const http = require('http');
const app = require('express')();
const port = process.env.PORT || 3000;
const HTTPError = require('node-http-error');
const dal = require('../DAL/no-sql.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


function BuildResponseError(err) {


    // no sql error message example
    //     { id: 'person_jackiekennedyo1922@gmail.org',
    // error: 'conflict',
    // reason: 'Document update conflict.',
    // name: 'conflict',
    // status: 409,
    // message: 'Document update conflict.',
    // ok: true }
    //
    // // custom DAL validation message example
    //
    // {
    // error: 'Bad Request',
    // reason: 'Unnecessary _id property within data.'
    // name: 'Bad Request',
    // status: 400,
    // message: 'Unnecessary _id property within data.',
    // ok: true }

    const statuscheck = isNaN(err.message.substring(0, 3)) === true ? "400" : err.message.substring(0, 3)
    const status = err.status ? Number(err.status) : Number(statuscheck)
    const message = err.status ? err.message : err.message.substring(3)
    const reason = message
    const error = status === 400 ? "Bad Request" : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message


    //   { error: 'Bad Request',
    // reason: 'Missing email property within data',
    // name: 'Bad Request',
    // status: 400,
    // message: 'Missing email property within data' }
    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

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

/////////////////////////
//    /reliefefforts
/////////////////////////
app.post('/reliefefforts', function(req, res, next) {
    console.log(req.body);

    dal.createReliefEffort(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError))
        }
        if (data) {
            console.log("POST " + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data);
        }
    })
})

/////////////////////////
///  /reliefefforts/id
/////////////////////////
app.get('/reliefefforts/:id', function(req, res, next) {
    const reliefEffortID = req.params.id;
    dal.getReliefEffort(reliefEffortID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log("GET " + req.path, data);
            res.append('Content-type', 'application/json');
            res.status(200).send(data);
        }
    });
});


app.post('/persons', function(req, res, next) {
    console.log(req.body);

    dal.createPerson(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError))
        }
        if (data) {
            console.log("POST " + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data);
        }
    })
})

//////////////////////////
///     /persons/id
//////////////////////////
app.get('/persons/:id', function(req, res, next) {
    const personID = req.params.id;
    dal.getPerson(personID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log("GET " + req.path, data);
            res.append('Content-type', 'application/json');
            res.status(200).send(data);
        }
    });
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
