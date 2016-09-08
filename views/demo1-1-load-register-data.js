/*jshint esversion: 6 */
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const couch_base_uri = "http://127.0.0.1:5984/"
const couch_dbname = "register-view-demo"
const db = new PouchDB(couch_base_uri + couch_dbname)

let receipts = [{
        _id: "5410",
        type: "store",
        storeCity: "Mount Pleasant",
        storeState: "SC",
        storePhone: "843 388 1550",
    }, {
        _id: "5409",
        type: "store",
        storeCity: "Charleston",
        storeState: "SC",
        storePhone: "843 388 4444",
    }, {
        _id: "100",
        type: "receipt",
        store_id: "5410",
        register: "1020312",
        date: "2016-04-05T17:18Z",
        advantageCard: false,
        tax: 0.08,
        balance: 5.97,
        debit: 5.97,
        change: 0.00,
        numberItemsSold: 3,
        itemsSold: [{
            desc: "DIAMOND WALNUTS",
            price: 2.99
        }, {
            desc: "STARKIST POUCH",
            price: 1.49
        }, {
            desc: "STARKIST POUCH",
            price: 1.49
        }]
    }, {
        _id: "200",
        type: "receipt",
        store_id: "5410",
        register: "1020312",
        date: "2016-04-05T19:35Z",
        advantageCard: false,
        tax: 0.07,
        balance: 5.58,
        debit: 5.58,
        change: 0.00,
        numberItemsSold: 2,
        items_sold: [{
            desc: "ALMOND BREEZE",
            price: 1.59
        }, {
            desc: "BOUNTY TOWELS",
            price: 3.99
        }]
    }, {
        _id: "300",
        type: "receipt",
        store_id: "5410",
        register: "1021188",
        date: "2016-04-05T14:30Z",
        advantageCard: false,
        tax: 0.06,
        balance: 3.18,
        cash: 5.00,
        change: 1.82,
        numberItemsSold: 2,
        itemsSold: [{
            desc: "MTN DEW KICKSTART",
            price: 1.59
        }, {
            desc: "TOSTITOS CHIPS",
            price: 3.99
        }]
    }, {
        _id: "400",
        type: "receipt",
        store_id: "5410",
        register: "1021188",
        date: "2016-04-06T17:28Z",
        advantageCard: false,
        tax: 0.05,
        balance: 2.99,
        cash: 5.00,
        change: 2.01,
        numberItemsSold: 1,
        itemsSold: [{
            desc: "LAYS CHIPS",
            price: 2.99
        }]
    }, {
        _id: "500",
        type: "receipt",
        store_id: "5409",
        register: "2021200",
        date: "2016-05-07T09:30Z",
        advantageCard: false,
        tax: 0.06,
        balance: 3.49,
        cash: 5.00,
        change: 1.51,
        numberItemsSold: 1,
        itemsSold: [{
            desc: "Cheetos",
            price: 3.43
        }]
    }, {
        _id: "600",
        type: "receipt",
        store_id: "5409",
        register: "2021200",
        date: "2016-05-07T08:01Z",
        advantageCard: false,
        tax: 0.09,
        balance: 4.39,
        cash: 10.00,
        change: 5.61,
        numberItemsSold: 1,
        itemsSold: [{
            desc: "Best Buy Milk",
            price: 4.30
        }]
    }, {
        _id: "700",
        type: "receipt",
        store_id: "5409",
        register: "2021200",
        date: "2016-04-05T18:18Z",
        advantageCard: false,
        tax: 0.10,
        balance: 12.40,
        debit: 12.40,
        change: 0.00,
        numberItemsSold: 4,
        items_sold: [{
            desc: "Red Delicious Apple",
            price: 0.30
        }, {
            desc: "Chiquita Banannas",
            price: 3.00
        }, {
            desc: "Pleasant Farms Strawberries",
            price: 4.00
        }, {
            desc: "Blueberry Pack",
            price: 5.00
        }]
    }

]

// put the documents into the database with a single call to bulkDocs();
db.bulkDocs(receipts, function(err, response) {
    if (err) return console.log(err)
    if (response) {
        // call bulkGet() with an array of id and rev pairs representing the revisions to fetch.
        //  The response from bulkDocs is an array of objects containing id and rev properties.
        db.bulkGet({
            include_docs: true,
            docs: response
        }, function(err, res) {
            if (err) {
                return console.log(err);
            }
            if (res) {
                return console.log("bulkGet response: ", JSON.stringify(res, null, 2));
            }
        });
    }
});
