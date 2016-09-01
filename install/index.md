# Installing CouchDB and curl

## Install CouchDB

Both OS X and Windows users can download the CouchDB installer.  Mac OS X users have the additional option of installing via Homebrew.

> Be sure to approve the installer to install CouchDB as service and let it be started automatically after installation.

0. Windows and OS X users can download and run the [Installer](http://couchdb.apache.org/) for your particular operating system.  
  - [Installation on Windows](http://docs.couchdb.org/en/1.6.1/install/windows.html)
  - [Installation on Mac OS X](http://docs.couchdb.org/en/1.6.1/install/mac.html)

0. [Install with Homebrew (Mac OS X only)](http://docs.couchdb.org/en/1.6.1/install/mac.html#installation-with-homebrew)


## Installing curl

Use the [curl Download Wizard](https://curl.haxx.se/dlwiz/?type=bin) to help you select the correct zip file to download for your operating system.  The zip file should contain an executable file named **curl.exe**.  If you unzip the file and don't see the .exe file, you've downloaded the wrong file.

> Windows users will need to be sure and select the correct Operating system (Win32 or Win64).

### Windows users

- Extract the contents of the zip file. If you have downloaded the correct version you should find **curl.exe**.
- Place **curl.exe** in a folder where you keep your software (e.g. D:\software\curl\curl.exe)
- To run curl from the command line, you must ensure the .exe is in your system path.

  - Right click **My Computer**
  - Select **Properties**
  - Click **Advanced system settings** link
  - On the **Advanced** tab, select the **Environment Variables** button.
  - Under System variable select 'Path' and edit.
  - Add a semicolon followed by the path to where you placed your **curl.exe** file. (e.g.: D:\software\curl)


## Verify curl

Tacoboy is a fun place to eat.  Just look at their menu: ([http://www.tacoboy.net/menu.html](http://www.tacoboy.net/menu.html)).  When you use an HTTP client (such as Chrome) to browse a website, the client must first establish a TCP connection with the HTTP "Web" server using the IP address associated with the host part of the URL (www.tacoboy.net). The connection is made, by default, on port 80.  The browser issues a request to download a resource (usually a web page) using the host portion of the URL (www.tacoboy.net) and a path to the resource (/menu.html).  Behind the scenes, the browser issues a `HTTP GET` request to retrieve and download the HTML to the browser. Assuming a successful response, the browser renders the HTML into something that looks delicious.

Issuing an HTTP GET with curl:

```
$ curl http://www.tacoboy.net/menu.html
```

If you get back the html for the menu, curl is properly installed.


## Verify the CouchDB install

Run the following curl command to test whether CouchDB is running:

```
$ curl http://127.0.0.1:5984/
```
If couch is running, you'll get back some JSON with a welcome message. The example below has been formatted for display purposes:

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

If you receive an error, you may need to [start couch](#starting-couchdb).

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

## Install Atom
