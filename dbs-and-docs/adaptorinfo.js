/* jshint esversion:6 */

const PouchDB = require('pouchdb');
var pouch = new PouchDB('myDB');
console.log(pouch.adapter);
