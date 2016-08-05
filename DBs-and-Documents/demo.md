
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
- Using Futon, add another driver as a new document in the database.. (See **drivers.json**.)
- Add a third driver with violations.

## List all documents for the specified database (/\_all_docs)

curl -X GET http://127.0.0.1:5984/drivers/_all_docs

## Create a driver document with the API

Using the contents of the **drivers-api-add1.json** and **drivers-api-add2.json** files, let's add some drivers to the **drivers** database.  We'll use curl to issue a `PUT` to the `http://127.0.0.1:5984/drivers` database along withe the `-d` option to point to a datafile containing our JSON representation of a new driver.  

We will need a new UUID to uniquely identify each new driver.  Each time you request a `GET` to `/_uuids`, the API responds with a fresh UUID value.   

```
$ curl -X GET http://127.0.0.1:5984/_uuids
```

You can add the returned UUID in the resource part of the URL to specify the location of the new driver in the database.  The UUID is the document's ID.  
We're using the `-d` or `--data` option to specify the data.  Starting with the `@` to specify a file.  Note in the examples below, the data files reside in a subdirectory named **1-intro**.

```
$ curl -X PUT http://127.0.0.1:5984/drivers/2791133276c33db1015c7adf8100931b -d "@1-intro/drivers-api-add1.json"
```
Let's add another driver using a fresh UUID and the **drivers-api-add2.json** file.

```
$ curl -X PUT http://127.0.0.1:5984/drivers/2791133276c33db1015c7adf81008dc9 -d "@1-intro/drivers-api-add2.json"
```
