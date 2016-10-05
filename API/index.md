# Creating a RESTful API

## What you will learn

- What is an API?
- Why are they important.
- Learn basic API design best practices.
- Create an http server and request handler
- Create a HTTP RESTful API to provide an interface for the outside world, such as a web application.

## What

The best metaphor ever ...

![This is an API](http://images.wisegeek.com/standard-us-power-outlet.jpg)

> The electrical socket interface is a layer of abstraction (it hides the specifics) to the underlying service. The consumer (again, not a person but rather a device) is blind to things like the color of the wiring in the walls, other devices the wiring is shared with, how the electricity is generated (whether it be from a wind farm, nuclear plant, coal-fired generator or solar array) or where those sources of power are located. For whatever motivations (such as cost savings, policy or public pressure), so long as the service delivers 120 volts of 60Hz AC power to the wall socket in a way that conforms to the standard, the service provider is free to change anything and everything from just behind the socket all the way to the source of power. Any such changes are transparent to consuming devices.  The same transparency works both ways. To the service, all consumers look the same. It is essentially blind to the specifics of the consuming device that’s on the other side of the electrical socket.... the consuming application and service (known as an API provider) are sufficiently decoupled to the point that they know little or nothing about one another, the interface through which they communicate represents a set of agreed-upon standards (similar to the 120v/60Hz AC standard for electricity) that enables applications to make requests of the service and get data and/or functionality in return. - [The Programmable Web](http://www.programmableweb.com/news/what-are-benefits-apis/analysis/2015/12/03)

- Have you used facebook or instagram? Worn a fitbit or smart watch?  Purchased something from your phone?  Created a netflix queue?  Ordered a pizza?
- APIs enable customers to act instantaneously on what they desire on any device at any time.
- APIs power the applications you use everyday.
- Application Programming Interface - an API specifies how software components should interact with each other
- An API is like a wall socket.
- APIs are similar to user interfaces.  A UI is interacted with by a user.  An API is interacted with by a software developer.
- An API is geared for consumption by software.  It is a technology that allows applications (software programs) to talk to one another.  

> "An API connects your business processes, services, content, and data to channel partners, internal teams, and independent developers in an easy and secure way. APIs are quickly becoming the de facto standard by which companies exchange data and build consistent cross-channel customer experiences." - API for dummies

```
BACKEND (Database)--> API TEAM --> API --> Developer --> APP --> USER
```
## Why

- Physical assets can be represented digitally.
- Digital assets can control physical assets.
- Digital assets can be combined to create something new.
- APIs expose, consume, and combine digital assets.  
- APIs represent and expose value to customers, either directly or indirectly.
- Think "outside-in".  What experience is needed by a partner, customer, or employee?
- Focus on the apps that will be needed to deliver that experience.
- Consider the APIs required to create the desired experience.

## How: Simple http server and request handler

- To use the HTTP server and client one must `require('http')`.
- Create a web server using `createServer(someRequestHandler)`
- The request handler function is called _every time an HTTP request is made_.
- Before you respond to requests you have to listen.

  ```
  const http = require('http');
  var server = http.createServer(function(request, response) {
    ... your code to handle the HTTP request goes here ...

  });

  // listen method needs to be called on the server object.
  // In most cases, all you'll need to pass to listen is the port number

  server.listen(port, function() {
     console.log('opened server on', server.address(), "port: ", port)
  });
  ```

### DEMO: Simple http server and request handler

- (API/1-demo-1.js)

## Data formats

- What type or types of data will your api support?  csv?  json?  xml?  html?  all of the above?
- JSON is generally accepted as the default format.
- If necessary, your api can support multiple formats such as json and xml
- Follow JavaScript conventions for naming attributes
  * `camelCase`  example: `firstName`

### DEMO: Different content types

### DEMO: Different content-type and routes

### Exercise:  Create your first http web server

[Your First http server](http://blog.modulus.io/build-your-first-http-server-in-nodejs)

### Exercise: Create your own http "people" server

- Within Nitrous, add a new folder named **express**.  Add a file to this folder named **1-ex.js**.
- Use the following code as a starting point:  


  ```

  ////////////////////////////////////////////
  //  Simple http server and request handler
  ////////////////////////////////////////////
  const http = require('http');
  const port = 3000;

  // Any node web server application will at some point have to create a web server object.
  // The request handler function is called once for every HTTP request
  // that's made against that server.

  var server = http.createServer(function(request, response) {

      // The response object is a WritableStream,
      // https://nodejs.org/api/http.html#http_class_http_serverresponse
      //
      // Here we return a 200 (OK) HTTP status code
      //  and the content-type... we're sending json back to the client, so....

      response.writeHead(200, {
          'Content-Type': 'application/json'
      });


      // create a response that contains your array of people.
      // Each person should contain the following field names:
      //____________________________________________________
      //   Field Name     |     Field Description
      //__________________|_________________________________
      // id               | integer. required. Ex: 2
      // firstName        | string. required.  Ex: "Jimmy"
      // lastName         | string. required.  Ex: "Martin"
      // phone            | string. required.  Ex: "(404) 394-2479"
      // email            | string. required.  Ex: "JimmyMartinJr@gmail.com"
      // type             | string. required.  Ex:  "person"
      // active           | boolean. required.  Ex:  true

      var responseBody = []

      // write the response to the stream
      // This sends a chunk of the response body.
      //  This method may be called multiple times to provide successive parts of the body.
      response.write(JSON.stringify(responseBody));
      response.end();
  });

  // In order to actually serve requests, the listen method needs
  //  to be called on the server object using the port number and some options
  //  such as the callback.

  server.listen(port, function() {
     console.log('opened server on', server.address(), "port: ", port)
  });
  ```

- Modify the code above so the http server only serves requests to the `/persons` route.  
- Return a JSON array of 3 persons
- Each item in the array should contain the following field names.
  * id        (integer. required.   Ex: 2)
  * firstName (string.  required.   Ex: "Jimmy")
  * lastName  (string.  required.   Ex: "Martin")
  * phone     (string.  required.   Ex: "(404) 394-2479")
  * email     (string.  required.   Ex: "JimmyMartinJr@gmail.com")
  * type      (string.  required.   Ex:  "person")
  * active    (boolean. required.   Ex: true)  

Here's an example:

```
{
   id: 2,
   firstName: "Jimmy",
   lastName: "Martin",
   phone: "404 394-2479",
   email: "JimmyMartinJr@gmail.com",
   type: "person",
   active: true
}
```

- Any other route requests (such as `\` or `\stuff`) should return a 404 (not found).  
  * Hint: `method` and `url`.
- Test your API by making requests from your web browser.
- Extra Credit (if you finish early):
  * Return a series of person images on the `\persons\images` route.
  * Support a `\persons\1` route that returns person data with an id of 1.
  * Support a `\persons\2` route that returns person data with an id of 2.
  * Support a `\persons\3` route that returns person data with an id of 3.
  * Support a `\persons\1\image` route that returns an image for person 1.
  * Support a `\persons\2\image` route that returns an image for person 2.
  * Support a `\persons\3\image` route that returns an image for person 3.

## ExpressJS

- Install Express :

 ```
 $ npm install express
 ```
- Express is a web framework for NodeJS.
- Layer over Node.js http module
- Use middleware to provide things like:
  * parsing http headers, http request parameters, http body (POST/PUT), cookies
  * Automatically determines response headers based on data returned
  * Establish 'routes' to handle requests

###  Exercise: Hello World

Complete the following:

[ExpressJS Hello World](https://expressjs.com/en/starter/hello-world.html)

### Routes

- You can define "routes" / api endpoints / URI's that respond to specific HTTP requests and verbs.

   ```
    var express = require('express');
    var app = express();

    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
   ```

- Route methods allow you to respond to HTTP verbs like `GET`, `POST`, `PUT`, `DELETE`

  ```
  // GET method route
  app.get('/', function (req, res) {
    res.send('GET request to the homepage');
  });

  // POST method route
  app.post('/', function (req, res) {
    res.send('POST request to the homepage');
  });
  ```

### Demo: Adding Express as a Request Handler

In the following demo we will include express, use it as a handler for incoming HTTP requests and respond to all HTTP GET events. (1-demo-4.js)

## API Design Best Practices

- Nouns are good; verbs are bad. Keep verbs out of your base URLs.
- Keep your base URL simple and intuitive.  A simple and intuitive base URL design makes using your API easy.
- Affordance is a design property that communicates how something should be used without
requiring documentation
- Use two base URLs per resource.
    * /persons — manages a collection of people
    * /persons/id  - manages a specific element in the collection
- Instead, use HTTP verbs to operate on the collections and elements.
- An intuitive API uses plural rather than singular nouns, and concrete rather than abstract names.

> Credit: Apigee API Design  [https://pages.apigee.com/rs/apigee/images/api-design-ebook-2012-03.pdf](https://pages.apigee.com/rs/apigee/images/api-design-ebook-2012-03.pdf)

![Alt text](/static/assets/img/reliefREST.png)

## Routing in Express

Using Express we can define our routes.  Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method/verb (GET, POST, PUT, DELETE).  

[Basic Routing](https://expressjs.com/en/starter/basic-routing.html)

Route parameters are named URL segments that are used to capture the values specified at their position in the URL.  In the example below, when we need a way to reference a single resource using a route.

```
// create a new person
app.post('/persons', function(req, res, next){ ... })

// list all the persons
app.get('/persons', function(req, res, next) {  ... })

// get a person by id
app.get('/persons/:id', function(req, res, next) { ... })

// update a person by id
app.put('/persons/:id', function(req, res, next){ ... })

// delete a person by id
app.delete('/persons/:id', function(req, res, next) { ... })
```

### Exercise:  Respond with the route parameters

Remember that route parameters are named URL segments that are used to capture the values specified at their position in the URL.  So, a route defined as:

```
app.get('/persons/:id/blogs/:blogId', function(req, res, next) { ... })
```

would handle a request URL such as

```
/persons/34/blogs/2
```

  > Before you attempt the exercise, read more about route paths and parameters within [routing](https://expressjs.com/en/guide/routing.html)

  - Create an api consisting of a single endpoint.  The endpoint should contain at least 2 URL segments that capture the values at their position in the URL, such as `/persons/34/blogs/2`. When the endpoint is requested from a web browser, respond with a JSON object containing the values of the route parameters.
    * hint:  `params`

##  Errors

- Align errors with HTTP status codes.
- Use [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) and try to map them cleanly to relevant standard-based codes.
- Start by using the following 3 codes. If you need more, add them. But you shouldn't need to go beyond 8.
  * `200` - OK  (Everything worked - success)
  * `400` - Bad Request (The application did something wrong – client error.)
  * `500` - Internal Server Error  (The API did something wrong – server error)

### Additional 5

- `201` - Created
- `304` - Not Modified
- `404` - Not Found
- `401` - Unauthorized
- `403` - Forbidden

### Response Code example

Here we are handling a HTTP `POST` request to the `/persons` resource.  The callback function will leverage the data access layer to create a person. If successful, we respond with the appropriate content type (JSON), a status code of `201` (created), and the data.  

```
app.post('/persons', function(req, res, next){
    console.log(req.body);

    dal.createPerson(req.body, function(err, data){
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError))
        }
        if (data) {
            console.log("POST " + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data);
        }
    })
})
```

## Be chatty with response messages

- Be verbose and use plain language descriptions. Add as many hints as your API team can think of about what's causing an error.
- Add a link in your description to more information in your documentation.

  ```
  {
      "developerMessage": "Verbose, plain language description of the problem for the app developer with hints about how to fix it.",
      "userMessage": "Pass this message on to the app user if needed.",
      "errorCode": 12345,
      "more info": "http://dev.teachdogrest.com/errors/12345"
  }
  ```

### Error handler in Express

- `node-http-error` helps create a consistent error object.
- Returning a new error causes the error to be handled by the error-handling _middleware_.
- In Express, you should define error-handling middleware _last_, after other `app.use()` and routes calls.
- Error-handling functions have four arguments: `(err, req, res, next)`.

  ```
  const HTTPError = require('node-http-error')

  // Here's a route to return an array of people
  app.post('/persons', function(req, res, next){
      console.log(req.body);

      dal.createPerson(req.body, function(err, data){
          if (err) {
              var responseError = BuildResponseError(err)
              return next(new HTTPError(responseError.status, responseError.message, responseError))
          }
          if (data) {
              console.log("POST " + req.path, data)
              res.append('Content-type', 'application/json');
              res.status(201).send(data);
          }
      })
  })

  //////////////////////
  //   Error handler
  //////////////////////
  app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500);
    res.send(err);
  });
  ```

### Demo:  Error Handling

Walk through creating errors and handling those errors with express middleware.

(1-demo-5.js)

### Exercise: Study error handling in express

Take 15 minutes and read more on middleware and error handling in express:

- [Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [node-http-error](https://www.npmjs.com/package/node-http-error)

### Exercise: Create a "good" route and a "bad" route

The goal of this exercise is to get you familiar with writing an error handler with Express. In this exercise we will create 2 routes. A good route that returns JSON data and a bad route that causes an error.  Handle the error and send a message back to the client.  

- Create a new JavaScript file to contain a new express application
- Require the following libraries:
  * `http`
  * `express`
  * `node-http-error`
- Create a new express app.
- Create an http server, passing in the express app to handle events
- Listen to http server events on port `8080`.
- Create a "good" `GET` route that simply returns simple json data.
- Create a "bad" `GET` route that causes `node-http-error` an error.
  * hint: use `next` to pass the error to an error handler.
- Utilize the ExpressJS `use` function to create an error handler.

## Cross origin resource sharing (CORS)

[Definition](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)



## Pagination

- Make it easy for developers to paginate objects in a database.
- Don't return every resource.
- Use limit and offset (or a similar variant).
- We’ll use `limit` and `startkey` (offset) query parameters.  
  * Use a `startkey` as your starting search criteria.
  * Use `limit` to limit the number of results.

## Again with the Pagination

```
/reliefefforts?sortby=name&startkey=haiti+2015&limit=5
```

here's another example:

```
/persons?startkey=Kennedy&limit=4
```

- `/reliefefforts` or `/persons` - a `GET` to these resources lists relief efforts or persons.
- `startkey` - offsetting (skip) x number of documents is an expensive operation for a database.  Using a “last searched token” like `startkey` allows you to skip over prior results. If provided, the results will list relief efforts _greater than_ the token/startkey.  If not provided, the results will start from the _beginning of the list_.
- `limit` - limits the amount of rows returned.  # of rows per page.

### Exercises

0. [``](/API/1)
0. [``](/API/2)
0. [``](/API/3)
0. [``](/API/4)
0. [``](/API/5)
0. [``](/API/6)
0. [``](/API/7)

[Home](/)
