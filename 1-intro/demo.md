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
