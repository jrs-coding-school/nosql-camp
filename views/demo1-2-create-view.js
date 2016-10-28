/*jshint esversion: 6 */
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const couch_base_uri = "http://127.0.0.1:5984/"
const couch_dbname = "register-view-demo2"
const db = new PouchDB(couch_base_uri + couch_dbname)

/////////////////////
/// helper functions
/////////////////////
function addView(view) {
    // put the design document and view into the database
    db.put(view, function(err, response) {
        if (err) return console.log(err)
        if (response) {
            console.log("response: ", JSON.stringify(response, null, 2));
        }
    });
}

/////////////////////
//   all receipts
/////////////////////
// To create views in CouchDB,  you create a function that takes a document
// and outputs (emit) key value pairs.
// you never need to emit() the full document in your map/reduce functions.
// You can always just use {include_docs: true} when you query the view
const designDocreceipts_all = {
    _id: "_design/receipts_all",
    language: "javascript",
    views: {
        receipts_all: {
            map: function(doc) {
                if (doc.type === 'receipt') {
                    emit(null, doc.store_id);
                }
            }.toString()
        }
    }
}
addView(designDocreceipts_all);

///////////////////////////////////////////////////////////////
//        all receipts, sort by store and register
///////////////////////////////////////////////////////////////
// use complex keys to sort query results by store and register
// note the names of the design document and view are the SAME
// recommend that you create one view per design doc,
// and use the same name for both, in order to make things simpler.
const designDocreceipts_by_StoreRegister = {
    _id: "_design/receipts_by_StoreRegister",
    language: "javascript",
    views: {
        receipts_by_StoreRegister: {
            map: function(doc) {
                if (doc.type === 'receipt') {
                    emit([doc.store_id, doc.register], {total: doc.balance, numberItemsSold: doc.numberItemsSold});
                }
            }.toString()
        }
    }
}
addView(designDocreceipts_by_StoreRegister);

///////////////////////////////////////////////////////////////
//        all receipts, sort by date
///////////////////////////////////////////////////////////////
// use complex keys to sort query results by store and register
// note the names of the design document and view are the SAME
// recommend that you create one view per design doc,
// and use the same name for both, in order to make things simpler.
const designDocreceipts_by_date = {
    _id: "_design/receipts_by_date",
    language: "javascript",
    views: {
        receipts_by_date: {
            map: function(doc) {
                if (doc.type === 'receipt') {
                    const receiptDate = new Date(doc.date)
                    emit([receiptDate.getUTCFullYear(),
                        receiptDate.getUTCMonth() + 1,
                        receiptDate.getUTCDate(),
                        receiptDate.getUTCHours(),
                        receiptDate.getUTCMinutes()
                        ],
                         {total: doc.balance, numberItemsSold: doc.numberItemsSold});
                }
            }.toString()
        }
    }
}
addView(designDocreceipts_by_date);

///////////////////////////////////////////////
//       Return stores and receipts.
///////////////////////////////////////////////
// View functions specify a key and a value to be returned for each row.
// CouchDB collates (sorts) the view rows by this key.
// The key is composed of a store _id and a sorting token.
// Because the key for receipt documents begins with the _id of a store document,
// all the orders will be sorted by store.
// Because the sorting token for stores (0) is lower than the token for receipts (1),
// the store document will come before the associated receipts.
// The values 0 and 1 for the sorting token are arbitrary.
const designDocStoresAndReceipts = {
    _id: "_design/StoresAndReceipts",
    language: "javascript",
    views: {
        StoresAndReceipts: {
            map: function(doc) {
                if (doc.type == "store") {
                    emit([doc._id, 0], null);
                } else if (doc.type == "receipt") {
                    emit([doc.store_id, 1], null);
                }
            }.toString()
        }
    }
}
addView(designDocStoresAndReceipts);

///////////////////////////////////////////////
//       Sum receipts by date
///////////////////////////////////////////////
// Compute a value over multiple documents
// Using the results of the map function, reduce the list to a single value
// Leverage the built in reduce functions, such as sum()
// http://docs.couchdb.org/en/latest/couchapp/ddocs.html#reducefun
// http://docs.couchdb.org/en/latest/couchapp/views/nosql.html#mapreduce-functions
const designDocReduceReceiptsTotals_by_date = {
    _id: "_design/receiptsTotals_by_date",
    language: "javascript",
    views: {
        receiptsTotals_by_date: {
            map: function(doc) {
                if (doc.type === 'receipt') {
                    const receiptDate = new Date(doc.date)
                    emit([receiptDate.getUTCFullYear(),
                        receiptDate.getUTCMonth() + 1,
                        receiptDate.getUTCDate(),
                        receiptDate.getUTCHours(),
                        receiptDate.getUTCMinutes()
                        ],
                         doc.balance);
                }
            }.toString(),
            reduce: function(keys, values) {
                return sum(values);
            }.toString()
        }
    }
}
addView(designDocReduceReceiptsTotals_by_date);

///////////////////////////////////////////////
//    Count items purchased receipts by store and date
///////////////////////////////////////////////
// Compute a value over multiple documents
// Using the results of the map function, reduce the list to a single value
// Leverage the built in reduce functions, such as sum()
// http://docs.couchdb.org/en/latest/couchapp/ddocs.html#reducefun
// http://docs.couchdb.org/en/latest/couchapp/views/nosql.html#mapreduce-functions
const designDocReduceReceiptsCount_by_date_store = {
    _id: "_design/receiptsCountItemsSold_by_date_store",
    language: "javascript",
    views: {
        receiptsCountItemsSold_by_date_store: {
            map: function(doc) {
                if (doc.type === 'receipt') {
                    const receiptDate = new Date(doc.date)
                    emit([doc.store_id,
                        receiptDate.getUTCFullYear(),
                        receiptDate.getUTCMonth() + 1,
                        receiptDate.getUTCDate(),
                        receiptDate.getUTCHours(),
                        receiptDate.getUTCMinutes()
                        ],
                         doc.numberItemsSold);
                }
            }.toString(),
            reduce: function(keys, values) {
                 return sum(values);
            }.toString()
        }
    }
}
addView(designDocReduceReceiptsCount_by_date_store);
