/*jshint esversion: 6 */
let driver = {firstName: 'Jeff', lastName: 'Sanchez'};

var createDB = function(dbName, data) {
    let db = new PouchDB(dbName, {adapter: 'memory'});


    db.put(driver, function(err, response) {
        if (err) { return console.log(err); }
        return response;
     });
};


var x = createDB('text', driver);

console.log(x);
