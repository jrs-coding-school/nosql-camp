/*jshint esversion: 6 */
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const couch_base_uri = "http://127.0.0.1:5984/"
const couch_dbname = "register-view-demo"
const db = new PouchDB(couch_base_uri + couch_dbname)

// query the receipts_all view.
//Returns all receipts.
// db.query('receipts_all', {
//     include_docs: true
// }, function(err, response) {
//     if (err) return console.log(err)
//     if (response) {
//         return console.log("receipts_all response: ", JSON.stringify(response, null, 2));
//         //return console.log("response: ", response);
//     }
// })

// Query the receipts_by_date view.
// Returns all receipts for April 5 between 3:00 and midnight
//http://127.0.0.1:5984/register-view-demo/_design/receipts_by_date/_view/receipts_by_date?startkey=[2016,4,5,15,0]&endkey=[2016,4,5,23,59]

// db.query('receipts_by_date', {
//     startkey: [2016,4,5,15,0],
//     endkey: [2016,4,5,23,59],
//     include_docs: true
// }, function(err, response) {
//     if (err) return console.log(err)
//     if (response) {
//         return console.log("receipts_by_date response: ", JSON.stringify(response, null, 2));
//         //return console.log("response: ", response);
//     }
// })


// Query the receipts_by_StoreRegister view.
// Returns all receipts for store 5409
//http://127.0.0.1:5984/register-view-demo/_design/storeRegister/_view/storeRegister?startkey=[%225409%22]&endkey=[%225409\uffff%22]&include_docs=true
// db.query('receipts_by_StoreRegister', {
//     startkey: ["5409"],
//     endkey:["5409\uffff"],
//     include_docs: true
// }, function(err, response) {
//     if (err) return console.log(err)
//     if (response) {
//         return console.log("receipts_by_StoreRegister response: ", JSON.stringify(response, null, 2));
//         //return console.log("response: ", response);
//     }
// })

// Returns all receipts for store 5410 and register 1020312
// http://127.0.0.1:5984/register-view-demo/_design/storeRegister/_view/storeRegister?startkey=[%225410%22,%221020312%22]&endkey=[%225410%22,%221020312\uffff%22]&include_docs=true
// db.query('receipts_by_StoreRegister', {
//     startkey: ["5410","1020312"],
//     endkey:["5410","1020312\uffff"],
//     include_docs: true
// }, function(err, response) {
//     if (err) return console.log(err)
//     if (response) {
//         return console.log("receipts_by_StoreRegister response: ", JSON.stringify(response, null, 2));
//         //return console.log("response: ", response);
//     }
// })

// Return stores and receipts
// list a specific store with _id = 5409, and all of that stores’s receipts,
// limit the startkey and endkey ranges to cover only documents for that store's _id.
//  match array keys with "5409" in the first element
// see http://couchdb.readthedocs.io/en/latest/couchapp/views/collation.html
db.query('StoresAndReceipts', {
    startkey: ["5409"],
    endkey:["5409", {}],
    include_docs: true
}, function(err, response) {
    if (err) return console.log(err)
    if (response) {
        return console.log("StoresAndReceipts response: ", JSON.stringify(response, null, 2));
        //return console.log("response: ", response);
    }
})
