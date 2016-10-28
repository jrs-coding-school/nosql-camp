/*jshint esversion: 6 */
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const couch_base_uri = "http://127.0.0.1:5984/"
const couch_dbname = "register-view-demo2"
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
//     endkey: [2016,4,5,23,59]
//     // ,
//     // include_docs: true
// }, function(err, response) {
//     if (err) return console.log(err)
//     if (response) {
//         return console.log("receipts_by_date response: ", JSON.stringify(response, null, 2));
//         //return console.log("response: ", response);
//     }
// })


// Query the receipts_by_StoreRegister view.
// Returns all receipts for store 5409
// http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister?startkey=[%225409%22]&endkey=[%225409\uffff%22]&include_docs=true
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
// http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister?startkey=[%225410%22,%221020312%22]&endkey=[%225410%22,%221020312\uffff%22]&include_docs=true
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
// db.query('StoresAndReceipts', {
//     startkey: ["5409"],
//     endkey:["5409", {}],
//     include_docs: true
// }, function(err, response) {
//     if (err) return console.log(err)
//     if (response) {
//         return console.log("StoresAndReceipts response: ", JSON.stringify(response, null, 2));
//         //return console.log("response: ", response);
//     }
// })


// Sum all the receipts
//http://127.0.0.1:5984/register-view-demo/_design/receiptsTotals_by_date/_view/receiptsTotals_by_date
db.query('receiptsTotals_by_date', {}, function(err, response) {
    if (err) return console.log(err)
    if (response) {
        return console.log("receiptsTotals_by_date response: ", JSON.stringify(response, null, 2));
        //return console.log("response: ", response);
    }
})

// Sum all the receipts for April 5th
//http://127.0.0.1:5984/register-view-demo/_design/receiptsTotals_by_date/_view/receiptsTotals_by_date?startkey=[2016,4,5,0,0]&endkey=[2016,4,5,24,0]
// db.query('receiptsTotals_by_date', {
//     startkey: [2016,4,5,0,0],
//     endkey:[2016,4,5,24,0]
// }, function(err, response) {
//     if (err) return console.log(err)
//     if (response) {
//         return console.log("receiptsTotals_by_date response: ", JSON.stringify(response, null, 2));
//         //return console.log("response: ", response);
//     }
// })

// Sum all the receipts by year and month
// running a series of reduce range queries: one for each group that shows up at the level you query
//http://127.0.0.1:5984/register-view-demo/_design/receiptsTotals_by_date/_view/receiptsTotals_by_date?group_level=2
// db.query('receiptsTotals_by_date', {group_level: 1}, function(err, response) {
//     if (err) return console.log(err)
//     if (response) {
//         return console.log("receiptsTotals_by_date response: ", JSON.stringify(response, null, 2));
//         //return console.log("response: ", response);
//     }
// })


// Count the number of items sold by StoresAndReceipts
// db.query('receiptsCountItemsSold_by_date_store', {group_level: 1}, function(err, response) {
//     if (err) return console.log(err)
//     if (response) {
//         return console.log("receiptsCountItemsSold_by_date_store response: ", JSON.stringify(response, null, 2));
//         //return console.log("response: ", response);
//     }
// })


// Relief Tracker  1 of 3
// https://pouchdb.com/2014/04/14/pagination-strategies-with-pouchdb.html
// Search by last names that begin with "John"
// No pagination ... which could return too may rows
//http://127.0.0.1:5984/relief-tracker/_design/lastNameView/_view/lastNameView?startkey=%22John%22&endkey=%22John\uffff%22&include_docs=true

// Relief Tracker  2 of 3
// Search by last names that begin with "John"
// limit by to 3 docs
// grab the first page of records
//http://127.0.0.1:5984/relief-tracker/_design/lastNameView/_view/lastNameView?startkey=%22John%22&endkey=%22John\uffff%22&include_docs=true&limit=3

// Relief Tracker  3 of 3
// Search by last names that begin with "John"
// limit by to 3 docs
// grab the next set of records, starting with the last key of the previous Search
// use startkey to skip the first row (otherwise, we would get repeated results)
//http://127.0.0.1:5984/relief-tracker/_design/lastNameView/_view/lastNameView?startkey=%22Johnsonperson_larryjohnson11111%22&endkey=%22John\uffff%22&include_docs=true&limit=3&skip=1



// TO DO:
// Linked document examples:
// http://wiki.apache.org/couchdb/Introduction_to_CouchDB_views#Linked_documents
// http://docs.couchdb.org/en/latest/couchapp/views/joins.html#using-view-collation
//  See reliefEffortsLinked design document within relief-tracker database
