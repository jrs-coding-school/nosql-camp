# Databases and Documents

## What you will learn

By completing this module you will be able to:
- Define CouchDB and PouchDB
- Describe the factors that favor NoSQL databases.
- Manage CouchDB databases and documents with Futon.
- Manage CouchDB with it's Hypertext Transfer Protocol (HTTP) Application Programming Interface (API) using a Command Line Interface (CLI).
- Manage PouchDB/CouchDB databases and documents with PouchDB's JavaScript API.

## What is CouchDB?

> Unlike a relational database management system (RDBMS), NoSQL is schema free -- you don't need to decide the structure of the data up front.

- CouchDB (or Couch) is a NoSQL (not only SQL) database management system (DBMS) that stores JSON documents within a database. In fact, everything is stored as JSON.  
- Unlike a relational database, CouchDB is schema-free. You _don't_ design the tables, columns, data types up-front.
- CouchDB allows you to easily replicate your data on your own machine or across computers around the world.  This promotes fault tolerance.
- A RESTful (REST-Representational State Transfer) API is baked into its DNA. Use the API to do anything. Futon, an administrative website for CouchDB, uses the API do manage things like creating database, editing JSON documents, running queries, triggering replication...
-  Couch utilizes map and reduce (MapReduce or MapReducing) for indexing and querying the database. Map extracts data while reduce aggregates data. Unlike RDBMS SQL queries, MapReduce can be distributed among multiple nodes making it scalable and fast. Map and reduce functions are written in JavaScript.
- CouchDB supports offline scenarios.  Replicate data to your mobile application.  Enter data locally while flying cross-country.  Sync the data when you land.  
    * Incremental replication.  

- Eventual consistency


## What is PouchDB?

PouchDB (Pouch) is a JavaScript database that is inspired by CouchDB.  It runs within the web browser.  This enables you as the developer to store data locally within the browser.  This is especially useful when the users of your applications are working offline.  

> It is very easy to synchronize the data with PouchDB with CouchDB, once your users are back online.  The synchronization is two-way.  Changes to CouchDB can be sync'd with Pouch, as well.

With PouchDB the requests to the database are local on the native machine.
- Low latency (fast)
- Replication to the CouchDB server via HTTP asynchronously.  
- Result is a good user experience for your apps.
-

PouchDB runs quite well in Node.js.  You can use Pouch's JavaScript Application Programming Interface (API) to talk directory to databases that reside in either CouchDB or PouchDB.  [more...](https://pouchdb.com/learn.html).  


## Relational or NoSQL

Factors that favor NoSQL:

- Is the problem domain well known? Do you truly know the schema up front?
- Do you need to quickly modify data behind an app and minimize disruption to users?
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

Tacoboy is a fun place to eat.  Just look at their menu: ([http://www.tacoboy.net/menu.html](http://www.tacoboy.net/menu.html)).  When you use an HTTP client (such as Chrome) to browse a website, the client must first establish a TCP connection with the HTTP "Web" server using the IP address associated with the host part of the URL (www.tacoboy.net). The connection is made, by default, on port 80.  The browser issues a request to download a resource (usually a web page) using the host portion of the URL (www.tacoboy.net) and a path to the resource (/menu.html).  Behind the scenes, the browser issues a `HTTP GET` request to retrieve and download the HTML to the browser. Assuming a successful response, the browser renders the HTML into something that looks delicious.

You can issue an HTTP GET with curl, too.  :

```
$ curl http://www.tacoboy.net/
```

> Notice the `$` in the code sample above?  We use the Linux/OS X convention of the dollar sign to denote the  prompt for your commands.  This is where you'll type your commands in the CLI. In Windows environments, you'll see something similar to  `C:\>`.

CouchDB has an API that you can talk to with your code via HTTP.  By creating HTTP requests, you can tell Couch to create databases, save data, query data, etc.

### Demo: Talking to CouchDB via HTTP with curl

- Let's pretend that you have CouchDB installed. Using a CLI such as Terminal in OS X or the Command Prompt in Windows, run the following `curl` command to test whether CouchDB is running:

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

    ** Example CouchDB Document**
    ```
    {
        "_id": "person_JimmyMartinJr@gmail.com",
        "_rev": "1-6a03349ba1398f6d38a3871ff9721725",
        "firstName": "Jimmy",
        "lastName": "Martin",
        "phone": "404 394-2479",
        "email": "JimmyMartinJr@gmail.com",
        "type": "person",
        "active": true
    }
    ```

- When adding via Futon, note the `_id`. It is populated for you.  This is a UUID. Documents are sorted by the `_id` field.  You are free to leverage the `_id` value.

    > In the future, you will write applications that interact with CouchDB/PouchDB via an API.  In your application's code, you will want to generate the `_id` value yourself.  This will help prevent duplicate documents if the first call fails due to a network issue, for example.  It also provides a handy way to sort the documents by default via `GET http://127.0.0.1:5984/YourDatabase/_all_docs`.

    * `_id` is reserved in CouchDB.
    * `_id` is always a string.
    * `_id` is the _primary key_ for your database.  
    * We can use the value of `_id` to our advantage. CouchDB/PouchDB will sort the documents by the `_id`.
    * For example, if you want to sort your documents by date (by default), you could use a Date for the `_id` value.
    * `Date().toISOString()` would give you a data string that looks like this:

    ```
    2011-10-05T14:48:00.000Z
    ```

    * See MDN [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
    * Using the API you can either use `db.put()` or `db.post()` to add a doc to the database.  With `db.put()`, you supply the `_id`. (Desired)  With `db.post()`, couch will supply the `_id` value for you. Using post is not desired as Couch will supply a random UUID and your docs will be sorted randomly.
    *


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
$ curl -X PUT http://127.0.0.1:5984/drivers/2791133276c33db1015c7adf81008dc9 -d "@drivers-api-add2.json"
```

## Creating a database with the PouchDB JavaScript API

```
new PouchDB([name], [options])
```

The following creates a local database named `test`.  If the `test` database already exists, the method will open the database:

```
new PouchDB('test')
```

The actual database used by PouchDB _depends on how you are using it_.

- In a Web browser, either IndexedDB or WebSQL is used.
- In Node.js, LevelDB is used.

See [Adapters](https://pouchdb.com/adapters.html).

- [Live Sample: Let's see what tonic uses](https://tonicdev.com/tripott/dbs-and-docs-demo-adapter)

- Demo: Let's see what NodeJS uses.  With the source and dependencies for this course downloaded to the instructors machine, move over to the appropriate directory and run the **adaptorinfo.js**

```
$ cd dbs-and-docs
$ node adaptorinfo.js
```

## Creating documents with the PouchDB JavaScript API

You'll need to use the PouchDB JavaScript API to communicate with PouchDB.  You can use the same API to talk to CouchDB, as well.

The PouchDB API is asynchronous.  That means you'll have to use callbacks, promises, and async functions. [more...](https://pouchdb.com/api.html).  Let's try adding a document.  

- You can use `put()` or `post()` to create a document within the database
- The basic rule of thumb is: If you use `put()` to add a document, you will need to provide a value for the `_id`. You can`post()` new documents without an `_id`. With `post()`, the database will generate a random UUID for the `_id` value.  
- `put()` is preferred.  With `put()` you control the value for the `_id`, _just make sure it is unique._
- `allDocs()` can be used to sort documents by `_id`.

- [Live Sample](https://tonicdev.com/tripott/dbs-and-docs-demo-putdoc)

### Exercises

0. [Adding a document](/dbs-and-docs/1)

## Create a batch of documents

You can add multiple documents to the database with a single call to `bulkDocs()` by passing a JSON array.  

- Remember, you have to choose whether you provide an `_id` parameter on each document within the array.  If you don't the database will create one for you.  

- [Live Sample](https://tonicdev.com/tripott/dbs-and-docs-demo1-addbulkdocs)

### Exercises

0. [Create a batch of documents](/dbs-and-docs/2)

## Fetching a batch of documents

- Use `allDocs()` to perform simple queries on the `_id` property.
- Results are sorted by `_id`.
- The call to `allDocs()` takes an options object and a callback.
- Options allow you to do things like:
    - return the document in the response:  
        `{include_docs: true}`
    - get documents within a range using `startkey` and `endkey`.
    - provide pagination to your applications by `limit`ing the maximum amount of docs to return and `skip`ping a specified amount of docs.
    - See pagination recipe for additional pagination information and strategies.  http://docs.couchdb.org/en/latest/couchapp/views/pagination.html


- [Live Sample](https://tonicdev.com/tripott/dbs-and-docs-demo-bulkget)

### Exercises

0. [Fetching a batch of documents](/dbs-and-docs/3)
0. [Fetching documents within a range](/dbs-and-docs/4)

## Designing searchable document IDs

Each document in Pouch/Couch has an ID. This ID is unique per database. You are free to choose any string to be the ID.  One strategy is use  Universally (or Globally) Unique IDentifier (UUID).  A UUID is a randomly generated number with VERY low collision probability.  This prevents two people from ever creating two different documents with the same ID.  Another strategy is to leverage the ID value to create useful queries via the `allDocs()`.  Yet another strategy is to combine a UUID with a searchable ID. As you design the documents for the database ask yourself, "What will be some popular questions asked on my database?".

> By thinking ahead and designing a searchable naming scheme for your document IDs, you can support different querying and sorting requests.  This strategy can limit the number of Map/Reduce views in your database.

- [Live Sample](https://tonicdev.com/tripott/dbs-and-docs-demo-searchable-ids)

### Exercises

0. [Designing Searchable Document IDs](/dbs-and-docs/5)

## Updating a document

CouchDB uses an optimistic concurrency model.  Whoever saves a change to a document first, wins.

To change a document, first grab the entire document out of CouchDB, make your changes to the JSON / object, and save the entire new revision (or version) of that document back into CouchDB. Each revision is identified by a new `_rev` value.

When you retrieve a document, couch returns the `_id` and `_rev`.

```
{"ok":true,"id":"6e1295ed6c29495e54cc05947f18c8af","rev":"2-2739352689"}
```

When it is time to update a document, you send the document revision value (`_rev`) along with the rest of your data in the update.  You are optimistic that no one else has updated your record in the meantime.  If they have, the `_rev` will be a different value and Couch will reject your update.  

```
{"error":"conflict","reason":"Document update conflict."}
```

To fix, add the latest revision number of your document to the JSON:

```
curl -X PUT http://127.0.0.1:5984/albums/6e1295ed6c29495e54cc05947f18c8af -d '{"_rev":"1-2902191555","title":"There is Nothing Left to Lose", "artist":"Foo Fighters","year":"1997"}'
```

- [Live Sample](https://tonicdev.com/tripott/dbs-and-docs-demo-update)

### Exercises

0. [Updating a document](/dbs-and-docs/6)

## Deleting documents

There are two ways to delete documents with the API.  One is to use the `db.delete()` method.  The other is to use `db.put()` with the `{_deleted: true}`.  Why?  See https://pouchdb.com/api.html#filtered-replication

- [Live Sample](https://tonicdev.com/tripott/dbs-and-docs-demo-delete)

### Exercises

0. [Deleting a document](/dbs-and-docs/7)

## Getting documents in bulk

`db.bulkGet()` allows you to provide a set of `id`s and `rev`s and retrieve matching documents using `option.docs`.

- [Live Sample](https://tonicdev.com/tripott/dbs-and-docs-demo-bulkget)

### Exercises

0. [Getting documents in bulk](/dbs-and-docs/8)

## All the URLs

- [Installing CouchDB and curl](/install/index)
- [CouchDB the Definitive Guide](http://guide.couchdb.org/editions/1/en/index.html)
- [CouchDB Docs](http://docs.couchdb.org/en/1.6.1/index.html)
- [curl](https://curl.haxx.se/docs/manpage.html)
- [JSON Primer](http://guide.couchdb.org/editions/1/en/json.html)

### Exercises
0. [Adding a document](/dbs-and-docs/1)
0. [Creating a batch of documents](/dbs-and-docs/2)
0. [Fetching a batch of documents](/dbs-and-docs/3)
0. [Fetching documents within a range](/dbs-and-docs/4)
0. [Designing Searchable Document IDs](/dbs-and-docs/5)
0. [Updating a document](/dbs-and-docs/6)
0. [Deleting documents](/dbs-and-docs/7)
0. [Getting documents in bulk](/dbs-and-docs/8)

## Homework

- Watch and complete the Getting Started video and tutorial

[Getting started with PouchDB and CouchDB](https://www.youtube.com/watch?v=-Z7UF2TuSp0)


[Home](/)
