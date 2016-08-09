# Introduction to CouchDB

## What is CouchDB?

> Unlike an RDBMS, NoSQL is schema free -- you don't need to decide the structure up front.

- CouchDB is a NoSQL (not only SQL) database management system (DBMS) that stores JSON documents within a database. In fact, everything is stored as JSON.  
- Unlike a relational DBMS (RDBMS), CouchDB is schema-free. You don't design the tables, columns, data types up-front.
- CouchDB allows you to easily replicate your data on your own machine or across computers around the world.  This promotes fault tolerance.
- A RESTful API is baked into its DNA. Use the API to do anything.  Futon uses the API do manage things like creating database, editing JSON documents, running queries, triggering replication...
-  Couch utilizes map and reduce (MapReduce or MapReducing) for indexing and querying the database. Map extracts data while reduce aggregates data. Unlike RDBMS SQL queries, MapReduce can be distributed among multiple nodes making it scalable and fast.
- CouchDB supports offline scenarios.  Replicate data to your mobile application.  Enter data locally while flying cross-country.  Sync the data when you land.  

## What is PouchDB?

Pouch is a JavaScript database that is inspired by CouchDB.  It runs within the web browser.  This enables you as the developer to store data locally within the browser.  This is especially useful when the users of your applications are working offline.  

> It is very easy to synchronize the data with PouchDB with CouchDB, once your users are back online.  The synchronization is two-way.  Changes to CouchDB can be sync'd with Pouch, as well.  

PouchDB runs quite well in Node.js.  You can use Pouch's JavaScript Application Programming Interface (API) to talk directory to databases that reside in either CouchDB or PouchDB.  [more...](https://pouchdb.com/learn.html).  

## Relational or NoSQL

Factors that favor NoSQL:

- Is the problem domain well known? Do you truly know the schema up front? Do you need to quickly modify data behind an app and minimize disruption to users?
- Will you have a large volume and velocity of incoming data? People, machines, IoT, devices sending data requires processing incoming data at speed.
- Do you need to gather data from distributed locations, such as multiple point of sale applications?
- Do you have a high availability, 'always-on' need.  Caching application objects, search results, session info, and common web pages will make your apps responsive and help prevent the back end of your application from bogging down under high demand.
- Do you need to dynamic scalability (scale up or down) to handle seasonal commerce swings or user activity spikes like those found in social gaming?
- Does your system truly handle real world documents, such as invoices?
- Do you need to store unstructured Web application session data?
- User profile store for user ids for authentication. Flexibly track user profiles and preferences, demographic, behavioral profiles for advertisement targeting.
- Do you need to to quickly access dense content (ebooks, articles, blog posts, metadata) for your application?

> "The volume, variety and velocity of data continue to spiral up, as does the number of people and devices—whether human or machine-driven—that routinely access and use Web and mobile apps. These factors, combined with a major shift toward cloud computing, mean traditional relational database management systems (RDBMSes) may not be the right fit anymore for the emerging generation of interactive applications." - [NoSQL Database Deployments: 10 Real-World Examples](http://www.eweek.com/database/slideshows/nosql-database-deployments-10-real-world-examples)

## Verify a CouchDB install using the Couch's HTTP API and curl

[curl](https://curl.haxx.se/docs/manpage.html) is a tool to transfer data from or to a server using a wide variety of protocols, such as HTTP/HTTPS.  We'll use curl to talk to CouchDB by issuing HTTP calls to do things like creating a database, editing and saving JSON documents, and define and run queries.

curl is a command line interface (CLI) which means you have to use a command-line tool such as Terminal, iTerm, bash, etc.  Windows users can use the [Command Prompt](http://www.digitalcitizen.life/7-ways-launch-command-prompt-windows-7-windows-8). CLI's work at a lower level than your operating system and you will have more control over the machine. But, it's less user-friendly.  

CouchDB has an API that you can talk to with your code via HTTP.  By creating HTTP requests, you can tell Couch to create databases, save data, query data

### Demo: Talking to CouchDB via HTTP with curl

- I have CouchDB installed on my computer. Using a CLI such as Terminal in OS X or the Command Prompt in Windows, run the following `curl` command to test whether CouchDB is running:

    ```
    $ curl http://127.0.0.1:5984/
    ```
    If CouchDB is running, you'll see something like this, but it wont look as pretty:

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

- Create a database with the API and curl

    We can use the http `PUT` verb to create a new database named `test` and a second command to list the database again.

    ```
    $ curl -X PUT http://127.0.0.1:5984/test
    $ curl http://127.0.0.1:5984/_all_dbs
    ```

    Couch returns the databases as a JSON array of strings:

    ```
    ["_replicator","_users","basic","drivers","test"]
    ```

    > When using curl to make http requests you normally have to provide the HTTP verb/method with the `-X` option, ex: `-X GET`.  curl issues `GET` requests by default.

    Here's another way to make the same request to list all the databases:

    ```
    $ curl -X GET http://127.0.0.1:5984/_all_dbs
    ```

- Let's create another database named `deleteme`, list all the databases, `DELETE` the `deleteme` database, and list all all the databases.

    ```
    $ curl -X PUT http://127.0.0.1:5984/deleteme
    $ curl -X GET http://127.0.0.1:5984/_all_dbs
    $ curl -X DELETE http://127.0.0.1:5984/deleteme
    $ curl -X GET http://127.0.0.1:5984/_all_dbs
    ```

> With CouchDB, everything is done 'under the hood' using the API via the HTTP `GET`, `POST`, `PUT` , and `DELETE` with the correct URI.  

- Let's view a listing of JSON documents stored within a specific database:

```
curl -X GET http://127.0.0.1:5984/test/_all_docs
```

## Intro to Futon

Futon is the built-in administration interface for CouchDB.  Futon makes it easy to view, create, and delete database and documents.

When CouchDB is installed locally, you can load Futon by browsing to:

```
 http://127.0.0.1:5984/_utils/
```

## Demo: Creating a database and documents with Futon

- Create a database named **drivers** that track driver licenses and the number of violations accumulated.
- Create a **New Document** within the new database.
- Using Futon, add a driver by adding `firstname` and `lastname` fields.

    > Documents values must be entered as valid JSON.

- Note the `_id` field and value is populated for you.  This is a UUID. Don't change this value.

    > In the future, you will write applications that interact with CouchDB/PouchDB via an API.  In your application's code, you will want to generate the `_id` value yourself.  This will help prevent duplicate documents if the first call fails due to a network issue, for example.  It also provides a handy way to sort the documents by default via `GET http://127.0.0.1:5984/YourDatabase/_all_docs`.

- Save the document.  Note the `_rev` field.  Note how the value starts with `1-`

    You will eventually write applications that will need to update existing documents within a database.  You will need to provide the _most recent_ `_rev` value in order to successfully save your changes.

- Update the document by adding a `middlename` field. Save the document.  

    New updates are _appended_ to the database and _do not overwrite_ the old version.  Each new update to a document with a pre-existing ID will _add a new revision_ with a new `_rev` value that starts with a value of `2-`.  

- Go to the previous version of the document. Go to the current document. Note the `_rev` value changes.  

    > Revision numbers are used by CouchDB to track changes for replication between databases.  

- Using Futon, add another driver as a new document in the database.. (See **drivers.json**.)

- Add a third driver with violations.

## Creating a document with the CouchDB HTTP API and curl

Using the contents of the **drivers-api-add1.json** and **drivers-api-add2.json** files, let's add some drivers to the **drivers** database.  We'll use curl to issue a `PUT` to the `http://127.0.0.1:5984/drivers` database along withe the `-d` option to point to a datafile containing our JSON representation of a new driver.  

The first thing to decide is how we want to uniquely identify a document in the database.  Remember, the `_id` property of a document is used to do this.  One option is to use a [Universal Unique Identifier (UUID)](https://en.wikipedia.org/wiki/Universally_unique_identifier) as the value for `_id`.

We will need a new UUID to uniquely identify each new driver.  Couch's API provides an `/_uuids` endpoint to facilitate this. Each time you request an HTTP `GET` to `/_uuids`, the API responds with a fresh UUID value.

```
$ curl -X GET http://127.0.0.1:5984/_uuids
```

You can add the returned UUID in the resource part of the URL to specify the location of the new driver in the database.   

We're using the `-d` or `--data` option to specify the data.  Starting with the `@` to specify a file.  

```
$ cd DBs-and-Documents
$ curl -X PUT http://127.0.0.1:5984/drivers/2791133276c33db1015c7adf8100931b -d "@drivers-api-add1.json"
```
Let's add another driver using a fresh UUID and the **drivers-api-add2.json** file.

```
$ curl -X PUT http://127.0.0.1:5984/drivers/2791133276c33db1015c7adf81008dc9 -d "@1-intro/drivers-api-add2.json"
```



## Creating documents with the PouchDB JavaScript API

You'll need to use the PouchDB JavaScript API to communicate with PouchDB.  You can use the same API to talk to CouchDB, as well.

The PouchDB API is asynchronous.  That means you'll have to use callbacks, promises, and async functions. [more...](https://pouchdb.com/api.html).  Let's try adding a document.  

- You can use `put()` or `post()` to create a document within the database
- The basic rule of thumb is: `put()` new documents with an `_id`, `post()` new documents without an   `_id`.  With `put()` you control the value for the `_id`, _just make sure it is unique._
- When you use `post()` the database will generate a random UUID for the `_id` value.
- `allDocs()` can be used to sort documents by `_id`, so if you use `put()`.


- Create a driver document with the API
- Retrieving a fresh UUID




[Home](/) | [Prev](/1-intro) | [Next](/3-tbd) | [Demo](/demo.md)
