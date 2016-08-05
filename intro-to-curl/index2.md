# Introduction to CouchDB

## What is CouchDB?

> Unlike an RDBMS, NoSQL is schema free -- you don't need to decide the structure up front.

- CouchDB is a NoSQL (not only SQL) database management system (DBMS) that stores JSON documents within a database. In fact, everything is stored as JSON.  
- Unlike a relational DBMS (RDBMS), CouchDB is schema-free. You don't design the tables, columns, data types up-front.
- CouchDB allows you to easily replicate your data on your own machine or across computers around the world.  This promotes fault tolerance.
- A RESTful API is baked into its DNA. Use the API to do anything.  Futon uses the API do manage things like creating database, editing JSON documents, running queries, triggering replication...
-  Couch utilizes map and reduce (MapReduce or MapReducing) for indexing and querying the database. Map extracts data while reduce aggregates data. Unlike RDBMS SQL queries, MapReduce can be distributed among multiple nodes making it scalable and fast.
- CouchDB supports offline scenarios.  Replicate data to your mobile application.  Enter data locally while flying cross-country.  Sync the data when you land.   

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

## Intro to curl

[curl](https://curl.haxx.se/docs/manpage.html) is a tool to transfer data from or to a server using a wide variety of protocols, such as HTTP/HTTPS.  We'll use curl to talk to CouchDB by issuing HTTP calls to do things like creating a database, editing and saving JSON documents, and define and run queries.

curl is a command line interface (CLI) which means you have to use a command-line tool such as Terminal, iTerm, bash, etc.  Windows peeps can use the command prompt. CLI's work at a lower level than Windows and you will have more control over the machine. But, it's less user-friendly.  

Tacoboy is a fun place to eat.  Just look at their menu: ([http://www.tacoboy.net/menu.html](http://www.tacoboy.net/menu.html)).  When you use an HTTP client (such as Chrome) to browse a website, the client must first establish a TCP connection with the HTTP "Web" server using the IP address associated with the host part of the URL (www.tacoboy.net). The connection is made, by default, on port 80.  The browser issues a request to download a resource (usually a web page) using the host portion of the URL (www.tacoboy.net) and a path to the resource (/menu.html).  Behind the scenes, the browser issues a `HTTP GET` request to retrieve and download the HTML to the browser. Assuming a successful response, the browser renders the HTML into something that looks delicious.

You can issue an HTTP GET with curl, too.  :

```
$ curl http://www.tacoboy.net/
```

> Notice the `$` in the code sample above?  We use the Linux/OS X convention of the dollar sign to denote the  prompt for your commands.  This is where you'll type your commands in the CLI. Windows environments use `C:\>`, instead.

## All the URLs

- [CouchDB the Definitive Guide](http://guide.couchdb.org/editions/1/en/index.html)
- [CouchDB Docs](http://docs.couchdb.org/en/1.6.1/index.html)
- [curl](https://curl.haxx.se/docs/manpage.html)
- [JSON Primer](http://guide.couchdb.org/editions/1/en/json.html)

[Home](/) | [Next](/2-DBs-and-Documents)
