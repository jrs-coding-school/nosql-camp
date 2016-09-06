/*jshint esversion: 6 */
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const couch_base_uri = "http://127.0.0.1:5984/"
const couch_dbname = "register-view-demo"
const db = new PouchDB(couch_base_uri + couch_dbname)


const designDoc = {
    _id: "_design/storeRegister",
    language: "javascript",
    views: {
        storeRegister: {
            map: "function(doc) { " +
                "if (doc.type === 'receipt') {" +
                    "emit([doc.store, doc.register, doc.date], doc.balance);" +
                "}" +
            "}"
        }
    }
}

// put the design document and view into the database
db.put (designDoc , function(err, response) {
    if (err) return console.log(err)
    if (response) {
        return console.log("response: ", JSON.stringify(response, null, 2));


    }
});
