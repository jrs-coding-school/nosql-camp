/*jshint esversion: 6 */

////////////////////////////////////////////////////
//        Different content-type and routes
////////////////////////////////////////////////////

// $ PORT=4000 node API/demos/1-demo-3.js
const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000
const path = require('path')

var server = http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/') {
    // set the status and headers before you start writing chunks of data to the body.
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })

    // writing a response body out to the client using a writeable stream
    response.write('<html>')
    response.write('<body>')
    response.write('<h2>Request Info</h2>')
    response.write('<h3>Method</h3>')
    response.write('<p>' + request.method + '</p>')
    response.write('<h3>Host</h3>')
    response.write('<p>' + request.headers.host + '</p>')
    response.write('<h3>URL</h3>')
    response.write('<p>' + request.url + '</p>')
    response.write('<h3>Browser Info (user-agent)</h3>')
    response.write('<p>' + request.headers['user-agent'] + '</p>')
    response.write('</body>')
    response.write('</html>')
    response.end()
  } else if (request.method === 'GET' && request.url === '/octocat') {
    var img = fs.readFileSync(
      path.join(__dirname, '../../API/image/octocat.png')
    )
    response.writeHead(200, { 'Content-Type': 'image/png' })
    response.end(img, 'binary')
  } else {
    response.statusCode = 404
    response.end()
  }
})

server.listen(port, () => console.log('opened server on', server.address()))
// listen callback demo option 2
//server.listen(port, summary(server));
