/*jshint esversion: 6 */
//const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
//const fetchConfig = require('zero-config');
//const uuid = require('node-uuid');

// var config = fetchConfig(path.join(__dirname, '..'), {
//     dcValue: 'test'
// });
const couch_base_uri = "http://127.0.0.1:5984/"
const couch_dbname = "relief-demo"
const db = new PouchDB(couch_base_uri + couch_dbname)

// const PouchDB = require('pouchdb');
// require('pouchdb/extras/memory');
// var db = new PouchDB('test', {
//     adapter: 'memory'
// });


const designDoc = {
    _id: _design / relief - test,
    _rev: 5 - ebcd715b81a491ff87e06bc2d8417b15,
    language: javascript,
    views: {
        receipts-store-register-date: {
            map: function(doc) {
                if (doc.type === "receipt") {
                    emit([doc.store, doc.register, doc.date], doc.balance);
                }
            }
        }
    }
}

// put the documents into the database with a single call to bulkDocs();
db.put (designDoc , function(err, response) {
    if (err) return console.log(err)
    if (response) {
        return console.log("response: ", JSON.stringify(response, null, 2));


    }
});
