## BACK END design

### Database Design
- Write your user stories (quickly, if you haven't done so already.)
- Review you user stories and begin to create your logical data model.
  - Create a list of entities (Nouns)
  - Add attributes to the entities

  > Track the names of the things (logical entities) you are tracking. For example, if you are building an event management system you start with a logical model containing a person, an event that people attend, and the person’s hotel room. Track the attributes for each entity. For the person entity this would be their name, address, phone, etc.

  ![Entities and attributes](https://mysql.how2js.com/static/assets/img/simple-entities.png)

- Model data types, optional

- Draw relationships between the entities.

  > After you have established some basic entities and attributes, you should begin thinking through the relationships between the entities.

- Using a spreadsheet (relational) or JSON file (nosql), begin to model your data for your application.  Make adjustments to your design.

### API Design and Stub out

- Create HTTP API Resources Grid:

![Alt text](/static/assets/img/reliefREST.png)

- Setup **app.js** within your **API** folder.  This library will be responsible for communicating with the outside world (such as your react.js application.  The API will leverage a DAL library to help with persisting data.)

  > Client <-|-> API <--> DAL <--> DB

- npm install dependencies and require them into your **app.js**

  ```
  const http = require('http');
  const app = require('express')();
  const bodyParser = require('body-parser');
  const HTTPError = require('node-http-error');
  const port = process.env.PORT || 3000;
  const cors = require('cors');
  app.use(bodyParser.json());
  ```

- Stub out an API route for creating a resource (ex: `POST /cats`)

  ```
  app.post('/cats', function(req, res, next) {
      console.log(req.body);
  })
  ```

- Create **dal.js**.  This library will be responsible for communicating with your database server.
- Require the **dal.js** into your **app.js**

  ```
  const dal = require('./dal.js')
  ```

## PRODUCTION Database

- Setup on Cloudant for production couchdb data

# REST REVIEW

## Building our API

- Think "outside-in".  What experience is needed by a partner, customer, or employee?
- Focus on the apps that will be needed to deliver that experience.
- Consider the APIs required to create the desired experience.

## Data formats

- Follow JavaScript conventions for naming attributes
  * `camelCase`  example: `firstName`

## ExpressJS

- Install Express:

  ```
  $ npm install express
  ```

- Express is a web framework for NodeJS.
- Layer over Node.js http module
- Use middleware to provide things like:
  * parsing http headers, http request parameters, http body (POST/PUT), cookies
  * Automatically determines response headers based on data returned
  * Establish 'routes' to handle requests

## Building the API

You can define "routes" / api endpoints / URI's that respond to specific HTTP requests and verbs.

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

## API Design Best Practices

  - Nouns are good; verbs are bad. Keep verbs out of your base URLs.
  - Keep your base URL simple and intuitive.  A simple and intuitive base URL design makes using your API easy.
  - Affordance is a design property that communicates how something should be used without requiring documentation
  - Use two base URLs per resource.
      * /persons — manages a collection of people. Plural nouns.
      * /persons/id  - manages a specific element in the collection. Plural nouns.
  - Instead of verbs in the routes, use HTTP verbs to operate on the collections and elements.
  - An intuitive API uses _plural rather than singular_ nouns, and concrete rather than abstract names.

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
