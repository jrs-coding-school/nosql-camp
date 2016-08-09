# Intro to curl

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
