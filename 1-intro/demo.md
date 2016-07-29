# Demo - Getting Started

## Futon
- Open Futon:  [http://127.0.0.1:5984/_utils/](http://127.0.0.1:5984/_utils/)
- Create a database named **drivers** that track driver licenses and the number of violations accumulated.
- Using Futon, add a driver buy adding firstname and lastname fields. Note the `_id` field and value is populate for you.  This is a UUID. Don't change this value.
- Save the document.  Note the `_rev` field.
- Update the document. New updates are appended to the database and do not overwrite the old version.  Each new update to a document with a pre-existing ID will add a new revision.
- Note the automatically inserted revision key.

add a couple of drivers to the database. Some properties are optional.  
- Add a third driver with violations.


## First call with curl

Tacoboy is a fun place to eat.  Just look at their menu: ([http://www.tacoboy.net/menu.html](http://www.tacoboy.net/menu.html)).  When you use an HTTP client (such as Chrome) to browse a website, the client must first establish a TCP connection with the HTTP "Web" server using the IP address associated with the host part of the URL (www.tacoboy.net). The connection is made, by default, on port 80.  The browser issues a request to download a resource (usually a web page) using the host portion of the URL (www.tacoboy.net) and a path to the resource (/menu.html).  Behind the scenes, the browser issues a `HTTP GET` request to retrieve and download the HTML to the browser. Assuming a successful response, the browser renders the HTML into something that looks delicious.

Issuing an HTTP GET with curl:

```
$ curl http://www.tacoboy.net/
```
- How did the results in your CLI differ from the browser?
- Did the CLI interpret and render the results?



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

## Starting Couchdb

### Using Homebrew (OSX)

If you did not see the "Welcome" message, you'll need to start CouchDB.  If you've installed CouchDB via Homebrew (OSX), you can start CouchDB as a background service:

```
$ brew services start couchdb
```

### Running CouchDB in a session

If you don't want CouchDB running all the time in the background, you can run it temporarily by running:

```
$ couchdb
```

If you want to issue additional curl commands, you'll have to do so in separate terminal session.  

## Explore Futon

- open Futon via [http://127.0.0.1:5984/_utils/](http://127.0.0.1:5984/_utils/)

## Admin the users

## Futon interacts with Couch via HTTP RESTful API
