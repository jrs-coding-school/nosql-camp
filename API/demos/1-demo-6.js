/*jshint esversion: 6 */

// $ NODE_ENV=development PORT=4000 DAL=nosql node API/app.js
const http = require('http');
const app = require('express')();
const summary = require('server-summary');
const bodyParser = require('body-parser');
const HTTPError = require('node-http-error');
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(bodyParser.json());

app.use(cors());

const volatileBaseOfData = [{
    id: 2,
    type: "cat",
    breed: "Siamese",
    desc: "The Siamese cat is one of the first distinctly recognized breeds of Asian cat. Derived from the rtgs: wichianmat landrace, one of several varieties of cat native to Thailand."
}, {
    id: 3,
    type: "cat",
    breed: "Maine Coon",
    desc: "The Maine Coon is the largest domesticated breed of cat. It has a distinctive physical appearance and valuable hunting skills."
}, {
    id: 4,
    type: "cat",
    breed: "Pixie-bob",
    desc: "The Pixie-bob is a breed of domestic cat claimed by breed founder Carol Ann Brewer of Washington State to be the progeny of naturally occurring bobcat hybrids."
}];



/////////////////////////
//
//   Helper Functions
//
////////////////////////

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function add(data, callback) {
    console.log("Add Helper... Here's the data: ", data);

    if (data.type) {
        data.id = getMaxOfArray(volatileBaseOfData.map(function(obj) {
            return obj.id;
        })) + 1;
        data.timestamp = Math.floor(new Date() / 1000);
        volatileBaseOfData.push(data);
        return callback(null, data);
    } else {
        console.log("Missing required", data);
        return callback(400, null);
    }
}

function update(index, data, callback) {
    if (data) {
        var numberToRemove = 1;
        data.timestamp = Math.floor(new Date() / 1000);
        volatileBaseOfData.splice(index, numberToRemove, data);
        return callback(null, data);
    } else {
        return callback(400);
    }
}

function deleteItem(index, callback) {
    if (index) {
        var numberToRemove = 1;
        volatileBaseOfData.splice(index, numberToRemove);
        return callback(null, {deleted: true});
    } else {
        return callback(400);
    }
}

function find(fn, list) {
    var newList = [];
    for (var i = 0; i < list.length; i++) {
        if (fn(list[i]) === true) {
            newList.push({
                data: list[i],
                index: i
            });
            break;
        }
    }
    return newList;
}

function findCat(catID) {
    var locateCat = function(cat) {
        console.log("cat.id: ",  cat.id, "catID :", catID )
        return cat.id === catID;
    };

    return find(locateCat, volatileBaseOfData);
}

///////////////////////
//
//        API
//
///////////////////////

// create a new cat
app.post('/cats', function(req, res, next) {
    console.log(req.body);

    console.log("app.post... Here's the data: ", req.body);
    add(req.body, function(err, addedData) {
        if (err) {
            return next(new HTTPError(err, "Make sure you put a cat in the http request body.Missing data"));
        }
        if (addedData) {
            console.log("POST " + req.path, addedData);
            res.append('Content-type', 'application/json');
            res.status(201).send(addedData);
        }
    });
});

app.get('/cats', function(req, res, next) {
    console.log("GET " + req.path, " query: ", req.query, volatileBaseOfData);
    res.append('Content-type', 'application/json');
    res.status(200).send(volatileBaseOfData);
});

app.get('/cats/:id/', function(req, res, next) {
    var foundCat = findCat(Number(req.params.id))

    if (foundCat.length > 0) {
        console.log("GET " + req.path, foundCat[0].data);
        res.append('Content-type', 'application/json');
        res.status(200).send(foundCat[0].data);
    } else {
        next(new HTTPError(404, 'Not found', {
            path: req.path
        }))
        console.log("GET " + req.path, " not found");
    }
});

app.put('/cats/:id', function(req, res, next) {
    var foundCat = findCat(Number(req.params.id));

    if (foundCat.length > 0) {
        console.log("Found record to update for  " + req.path, "replace : ", foundCat[0].data, " with ",  req.body, " at index ", foundCat[0].index);

        update(foundCat[0].index, req.body, function(err, updatedData) {
            if (err) {
                return next(new HTTPError(err, "error updating data"));
            }
            if (updatedData) {
                console.log("PUT " + req.path, updatedData);
                res.append('Content-type', 'application/json');
                res.status(200).send(updatedData);
            }
        });
    } else {
        next(new HTTPError(404, 'Not found', {
            path: req.path
        }));
        console.log("PUT " + req.path, " not found");
    }
});

app.delete('/cats/:id', function(req, res, next) {
    console.log("req.params.id ", req.params.id);
    var foundCat = findCat(Number(req.params.id));
    console.log("foundCat", foundCat);
    if (foundCat.length > 0) {
        console.log("Found record to delete for: " + req.path);

        deleteItem(foundCat[0].index, function(err, deletedData) {
            if (err) {
                return next(new HTTPError(err, "error deleting data"));
            }
            if (deletedData) {
                console.log("DELETE " + req.path, deletedData);
                res.append('Content-type', 'application/json');
                res.status(200).send(deletedData);
            }
        });

    } else {
        next(new HTTPError(404, 'Not found', {
            path: req.path
        }));
        console.log("DELETE " + req.path, " not found");
    }
});

app.get('*', (req, res) => res.send({
    ok: true
}))

//////////////////////
//   Error handler
//////////////////////
app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500);
    res.send(err);
});

var server = http.createServer(app);
server.listen(port, summary(server));
