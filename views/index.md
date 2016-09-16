# Views

## What you will learn

- Learn the structure of a design document
- Learn how to display a design document from curl and Futon
- Learn how to run a query using curl and Futon
- Create design documents and views using map and reduce functions

> For more information on views see [Finding Your Data with Views](http://guide.couchdb.org/draft/views.html) within the **CouchDB The Definitive Guide**.

## When you need more power

Querying documents with `allDocs()` can only take you so far. You are limited to the constraints of your `_id` values. You need the ability to define the key and values returned to support different queries on the documents.

Views are the primary tool used for querying and reporting on CouchDB databases. They are defined in JavaScript.

Views allow you to:

- Filter documents in the database to find information for particular use case or process in your application.
- Extract and order data from your documents.
- Build indexes for quickly finding specific documents using any value that resides within the database.
- Represent relationships between docs.
- Perform calculations on the data.

## Design documents and views

Design documents are like any other document in Couch, with one exception. When naming design documents, you must begin the name with `_design/`. For example, `_design/relief-test`.

Define the view (query) within a design document using the following format. A view contains a map function and an optional reduce function:

```
{
    "_id": "_design/relief-test",
    "views": {
        "viewname": {
            "map": "function(doc) { ... }",
            "reduce": "function(keys, values) { ... }"
        }
    }
}
```

A design document can contain one or many views.

```
{
    "_id": "_design/relief-test",
    "language": "javascript",
    "views": {
        "persons-last-first": {
            "map": "function(doc) {if (doc.type === "
            person ") {emit([doc.lastName, doc.firstName], doc.lastName + ', '+ doc.firstName);}}"
        },
        "relief-efforts": {
            "map": "function(doc) {if (doc.type === "
            relief " && doc.name && doc.organizationID) {emit(doc.name, doc.organizationID);}}"
        },
        "persons-email": {
            "map": "function(doc) {if (doc.type === "
            person " && doc.firstName && doc.lastName && doc.email && doc.active ===true) {emit(doc.email, doc.firstName + ' ' + doc.lastName);}}"
        }
    }
}
```

Once defined you can run the view using Futon or by querying your view with the built in HTTP API or some other api such as the PouchDB api.

### Demo:  Viewing the design documents

- View a design document using Futon

    [http://127.0.0.1:5984/relief-tracker/_design/emailView](http://127.0.0.1:5984/relief-tracker/_design/emailView)

- Retrieve the design documents using `HTTP GET` via the browser.

    [http://127.0.0.1:5984/relief-tracker/_design/emailView/_view/emailView](http://127.0.0.1:5984/relief-tracker/_design/emailView/_view/emailView)

> When you query the view, Couch will run the view on _every document in the database_. As a developer you will use the api to query the view and retrieve the list.

Map functions must have a `doc` parameter which represents a single document in the database. In the example below, we have a design document named `_design/receipts_by_StoreRegister` and a map function with the _same name_. The map function accepts the `doc` parameter value, checks to see if doc is a receipt, and emits a key and a value.

Use the built-in `emit(key, value)` function which accepts accepts a `key` argument for sorting the results of the view and the `value` argument. Whatever is passed into the `emit()` function creates an entry into the view result which results in a row in a list.

```

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
```

The function emits a key that contains an array of store id's and register numbers. The results will be sorted by this key. The key can be used by a query to search for specific documents.

```
function(doc) {
    if (doc.type === 'receipt') {
        emit([doc.store_id, doc.register], {total: doc.balance, numberItemsSold: doc.numberItemsSold});
    }
}
```

> key values support sorting and searching documents.

Query the view using the pouchdb api.

```
//Returns all receipts for store 5410 and register 1020312
//http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister?startkey=[%225410%22,%221020312%22]&endkey=[%225410%22,%221020312\uffff%22]&include_docs=true
db.query('receipts_by_StoreRegister', {
    startkey: ["5410","1020312"],
    endkey:["5410","1020312\uffff"],
    include_docs: true
}, function(err, response) {
    if (err) return console.log(err)
    if (response) {
        return console.log("receipts_by_StoreRegister response: ", JSON.stringify(response, null, 2));
        //return console.log("response: ", response);
    }
})
```

An array of documents sorted by the `key` are returned:

```
{
    total_rows: 7,
    offset: 3,
    rows: [{
        id: "100",
        key: ["5410", "1020312"],
        value: {
            total: 5.97,
            numberItemsSold: 3
        },
        doc: {
            _id: "100",
            _rev: "1-b3a2613316bef0487894116da6dbbaed",
            type: "receipt",
            store_id: "5410",
            register: "1020312",
            date: "2016-04-05T17:18Z",
            advantageCard: false,
            tax: 0.08,
            balance: 5.97,
            debit: 5.97,
            change: 0,
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
        }
    }, {
        id: "200",
        key: ["5410", "1020312"],
        value: {
            total: 5.58,
            numberItemsSold: 2
        },
        doc: {
            _id: "200",
            _rev: "1-a04d4a7078ca18afcecb472b27857aa5",
            type: "receipt",
            store_id: "5410",
            register: "1020312",
            date: "2016-04-05T19:35Z",
            advantageCard: false,
            tax: 0.07,
            balance: 5.58,
            debit: 5.58,
            change: 0,
            numberItemsSold: 2,
            items_sold: [{
                desc: "ALMOND BREEZE",
                price: 1.59
            }, {
                desc: "BOUNTY TOWELS",
                price: 3.99
            }]
        }
    }]
}
```

### Demo: Using the API to create design documents

Once a design document has been designed, you can add it to the database with Futon or `HTTP PUT` via curl or with the pouch api via `db.put`.

- Let's create a database and load some documents containing grocery store register data.   

   > Instructor: **views/demo1-1-load-register-data.js**

- Create some design documents.  Each design document will contain 1 view.

   > Instructor: **views/demo1-2-create-view.js**

### Demo:  Viewing the design documents

- View a design document using Futon
- Retrieve the design documents using `HTTP GET` via the browser.

    [http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister](http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister)

### Demo: Query using Futon

### Exercises

0. [Creating a "persons by email" view](/views/1)
1. [Return persons by last name, return relief efforts by name](/views/2)

## Query Options: `include_docs`

Use the `include_docs` to include the document in each row returned.

### Demo

- Simple query, without `include_docs`

    [http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister](http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister)

- Using the `include_docs` option.

    [http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister?include_docs=true](http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister?include_docs=true)

## Query Options: `startkey`, `endkey`

Use the `startkey`, `endkey` options to limit results

### Demo: Limit the results to store "5410 and register "1020312" using `startkey`, `endkey` options

  [http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister?startkey=[%225410%22,%221020312%22]&endkey=[%225410%22,%221020312\uffff%22]&include_docs=true](http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister?startkey=[%225410%22,%221020312%22]&endkey=[%225410%22,%221020312\uffff%22]&include_docs=true)    

- Same query but include the docs in the results

  [http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister?include_docs=true](http://127.0.0.1:5984/register-view-demo/_design/receipts_by_StoreRegister/_view/receipts_by_StoreRegister?include_docs=true)


## TO DO:  Go through demo1-3-query.js and add demos



### Exercises

0. [Creating a Relief Tracker View](/views/1)
1. [TODO View Exercise 2](/views/2)
2. [TODO View Exercise 3](/views/3)

[Home](/)
