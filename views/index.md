# Views

## What you will learn

- Learn the structure of a design document
- Learn how to display a design document from curl and Futon
- Learn how to run a query using curl and Futon
- Create design documents and views using map and reduce functions

## When you need more power

Querying documents with `allDocs()` can only take you so far.  You are limited to the constraints of your `_id` values.  You need the ability to define the key and values returned to support different queries on the documents.  

Views are the primary tool used for querying and reporting on CouchDB databases. They are defined in JavaScript.  

### Design documents and views

Design documents are like any other document in Couch, with one exception. When naming design documents, you must begin the name with `_design/`. For example, `_design/relief-test`.

```
$ curl -GET http://127.0.0.1:5984/relief-tracker/_design/relief-test
```

You must define the view (query) within a design document using the following format:

```
{
    "_id": "_design/relief-test",
    "_rev": "5-ebcd715b81a491ff87e06bc2d8417b15",
    "views": {
        "viewname": {
            "map": "function(doc) { ... }",
            "reduce": "function(keys, values) { ... }"
        }
    }
}
```

A design document can contain many views. A view contains a map function and an optional reduce function.

```
{
    "_id": "_design/relief-test",
    "_rev": "5-ebcd715b81a491ff87e06bc2d8417b15",
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

### Demo: Querying a view with curl

Once a view has been created, you can run the query by hitting the appropriate endpoint.  Here's a low level http example with curl:

```
$ curl -GET http://127.0.0.1:5984/relief-tracker/_design/relief-test/_view/persons-last-first
```
### Demo: Viewing design documents and queries in Futon

## Demo:  Using the API to create a design document and query the databases

## Demo: Creating a reduce function to count purchases

### Exercises

0. [TODO View Exercise 1](/views/1)
0. [TODO View Exercise 2](/views/2)
0. [TODO View Exercise 3](/views/3)

[Home](/)
