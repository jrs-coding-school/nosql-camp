# Demo - Getting Started

## curl

Tacoboy is a fun place to eat.  Just look at their menu: ([http://www.tacoboy.net/menu.html](http://www.tacoboy.net/menu.html)).  When you use an HTTP client (such as Chrome) to browse a website, the client must first establish a TCP connection with the HTTP "Web" server using the IP address associated with the host part of the URL (www.tacoboy.net). The connection is made, by default, on port 80.  The browser issues a request to download a resource (usually a web page) using the host portion of the URL (www.tacoboy.net) and a path to the resource (/menu.html).  Behind the scenes, the browser issues a `HTTP GET` request to retrieve and download the HTML to the browser. Assuming a successful response, the browser renders the HTML into something that looks delicious.

Issuing an HTTP GET with curl:

```
$ curl http://www.tacoboy.net/
```


## Verify the CouchDB install

Run the following curl command to test whether CouchDB is running:

```
$ curl http://127.0.0.1:5984/
```
If couch is running, you'll see something like this, but it wont look as pretty:

```
{
    "couchdb": "Welcome",
    "uuid": "c00e67dce09804896c2e664e6113a370",
    "version": "1.6.1",
    "vendor": {
        "name": "Homebrew",
        "version": "1.6.1_6"
    }
}
```

## GET a list of databases (/\_all_dbs)

```
$ curl http://127.0.0.1:5984/_all_dbs
```
> When using curl to make http requests you normally have to provide the HTTP verb/method with the `-X` option, ex: `-X GET`.  curl issues `GET` requests by default.

Here's another way to make the same request:

```
$ curl -X GET http://127.0.0.1:5984/_all_dbs
```
## Create a database with the API

We can use the http `PUT` verb to create a new database named `test` and a second command to list the database again.

```
$ curl -X PUT http://127.0.0.1:5984/test
$ curl -X GET http://127.0.0.1:5984/_all_dbs
```

Couch returns the databases as a JSON array of strings:

```
["_replicator","_users","basic","drivers","test"]
```

## Deleting a database with the API

Let's create another database named `deleteme`, list all the databases, `DELETE` the `deleteme` database, and list all all the databases.

```
$ curl -X PUT http://127.0.0.1:5984/deleteme
$ curl -X GET http://127.0.0.1:5984/_all_dbs
$ curl -X DELETE http://127.0.0.1:5984/_deleteme
$ curl -X GET http://127.0.0.1:5984/_all_dbs
```
> With CouchDB, everything is done 'under the hood' using the API via the HTTP `GET`, `POST`, `PUT` , and `DELETE` with the correct URI.  

## Futon - the built-in administration interface
- Open Futon:  [http://127.0.0.1:5984/_utils/](http://127.0.0.1:5984/_utils/)
- Note the listing of databases.

## Creating a database and documents with Futon
- Create a database named **drivers** that track driver licenses and the number of violations accumulated.
- Create a **New Document** within the new database.
- Using Futon, add a driver by adding `firstname` and `lastname` fields.

> Documents values must be entered as valid JSON.

- Note the `_id` field and value is populated for you.  This is a UUID. Don't change this value.

> In the future, you will write applications that interact with CouchDB.  In your application's code, you will want to generate the UUID yourself.  This will help prevent duplicate documents if the first call fails due to a network issue, for example.  

- Save the document.  Note the `_rev` field.  Note how the value starts with `1-`

You will eventually write applications that will need to update existing documents within a database.  You will need to provide the _most recent_ `_rev` value in order to successfully save your changes.

- Update the document by adding a `middlename` field. Save the document.  

New updates are _appended_ to the database and _do not overwrite_ the old version.  Each new update to a document with a pre-existing ID will _add a new revision_ with a new `_rev` value that starts with a value of `2-`.  

- Go to the previous version. Note the `-rev` values.
- Revision numbers are used by CouchDB to track changes for replication between databases.  
- Using Futon, add another driver. (See **drivers.json**.)
- Add a third driver with violations.

## List all documents for the specified database (/\_all_docs)

curl -X GET http://127.0.0.1:5984/drivers/_all_docs


## Create a document with the API
