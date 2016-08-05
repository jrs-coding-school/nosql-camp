# README

## Outline

0. Intro
0. Creating DBs and documents
0. PouchDB
0.


## Exercises

### Views and Queries

0. Create a database to store contact information.  Each contact document will hold a persons's name, email address, mailing address, phone, and the date and time last updated.
0. Create a design document to hold a view that lists the person's email address, id and name.
0. Create a query that uses _view parameters_ in the URI to constrain the result set to a single document. The query will retrieve a single person by email address.
0. Update the format of the date/time last updated field to support flexible querying.
0. Create a query that uses _view parameters_ in the URI to constrain the result set to a specify an inclusive range of documents.  The query will retrieve a list of people updated for a data/time range.
0.  Add a field to track interests for a person.  Use an array of strings to track the interests.  Ex:  `interests: ["sky diving", "kayaking", "reading"]`
0. Modify the design document to add a new view that provides an index of all the people who have interests.
0.  Create a query that returns the `_id` of the people who have a specific interest. Example.  Show everyone who likes to read.
o. descending = true
0. Create a `validate_doc_update` function to prevent invalid document updates.
