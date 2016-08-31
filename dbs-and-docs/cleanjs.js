const testcallback = require("notebook")("tripott/dbs-and-docs-test-bulkget/latest");
const PouchDB = require('pouchdb');
require('pouchdb/extras/memory');
var db = new PouchDB('test', {
    adapter: 'memory'
});

let receipts = [{
    _id: "100",
    doc_type: "receipt",
    store: "5410",
    store_city: "Mount Pleasant",
    store_state: "SC",
    store_phone: "843 388 1550",
    register: "1020312",
    date: "2016-04-05T14:30Z",
    advantage_card: false,
    tax: 0.08,
    balance: 5.97,
    debit: 5.97,
    change: 0.00,
    number_items_sold: 3,
    items_sold: [{
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
    doc_type: "receipt",
    store: "5410",
    store_city: "Mount Pleasant",
    store_state: "SC",
    store_phone: "843 388 1550",
    register: "1020200",
    date: "2016-04-05T14:30Z",
    advantage_card: false,
    tax: 0.07,
    balance: 5.58,
    debit: 5.58,
    change: 0.00,
    number_items_sold: 2,
    items_sold: [{
        desc: "ALMOND BREEZE",
        price: 1.59
    }, {
        desc: "BOUNTY TOWELS",
        price: 3.99
    }]
}, {
    _id: "300",
    doc_type: "receipt",
    store: "5410",
    store_city: "Mount Pleasant",
    store_state: "SC",
    store_phone: "843 388 1550",
    register: "1021188",
    date: "2016-04-05T14:30Z",
    advantage_card: false,
    tax: 0.06,
    balance: 3.18,
    cash: 5.00,
    change: 1.82,
    number_items_sold: 2,
    items_sold: [{
        desc: "MTN DEW KICKSTART",
        price: 1.59
    }, {
        desc: "TOSTITOS CHIPS",
        price: 3.99
    }]
}, {
    _id: "400",
    doc_type: "receipt",
    store: "5410",
    store_city: "Mount Pleasant",
    store_state: "SC",
    store_phone: "843 388 1550",
    register: "1021190",
    date: "2016-04-06T14:30Z",
    advantage_card: false,
    tax: 0.05,
    balance: 2.99,
    cash: 5.00,
    change: 2.01,
    number_items_sold: 2,
    items_sold: [{
        desc: "LAYS CHIPS",
        price: 2.99
    }]
}]

// put the documents into the database with a single call to bulkDocs();
db.bulkDocs(receipts, function(err, response) {
    if (err) return console.log(err)
    if (response) {
        // The callback from the call to bulkDocs() has fired. If we have a response object,
        // remove the first and last item from the response.
        response.shift()
        response.pop()

        // call bulkGet() with an array of id and rev pairs representing the revisions to fetch.
        //  The response from bulkDocs is an array of objects containing id and rev properties.
        db.bulkGet({
                include_docs: true,
                attachments: false,
                docs: response
            }, testcallback(null, {
                ok: true,
                startid: "200",
                endid: "300"
            })

        );
    }
});
