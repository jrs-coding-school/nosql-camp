# Exercise: Designing searchable doc IDs

> Before attempting this exercise, you must have read and performed the steps within the `relief-student` repo's README.md:  https://github.com/jrs-innovation-center/relief-student


Each document in Pouch/Couch has an ID. This ID is unique per database. You are free to choose any string to be the ID.  One strategy is use  Universally (or Globally) Unique IDentifier (UUID).  A UUID is a randomly generated number with VERY low collision probability.  This prevents two people from ever creating two different documents with the same ID.  Another strategy is to leverage the ID value to create useful queries via the `allDocs()`.  Yet another strategy is to combine a UUID with a searchable ID. As you design the documents for the database ask yourself, "What will be some popular questions asked on my database?".

> By thinking ahead and designing a searchable naming scheme for your document IDs, you can support different querying and sorting requests.  This strategy can limit the number of Map/Reduce views in your database.

In this exercise, you will gain experience designing simple documents with searchable yet unique document IDs.  You must accomplish the following:

- Create a new database named `relief-tracker` to track relief efforts and people.  
- Use **camelCase** for property names. Example: `firstName`.  
- Leverage the appropriate API method to add 5 persons to the database.  Each person document should contain the following information:
    - ID
    > Hint 1:  To distinguish "person" documents from other types of documents in the database, consider using a prefix.

    > Hint 2: Assume that users of your application will need to lookup people by their email address.    
    - first name
    - last name
    - phone number
    - email address
    - active (used as a 'soft' delete. Ex: `true`)
    - type (denotes the type of document in the document.  ex: ``"person"`` versus `"relief"`)

- Add 5 relief effort documents to the database.  Each relief effort document should contain the following information:
   - ID
   > Hint 1:  To distinguish "relief" documents from "person" documents, consider using a prefix

   > Hint 2: Assume that users of your application will need to search relief efforts by the organization and relief effort name.
   - name
   - description
   - phase (Ex: `"planning"`,`"completed"`, `"active"`)
   - tags (Ex: `"education"`, `"medical"`, `"infrastructure"`, `"supplies"`, `"water"`)
   - type (denotes the type of document in the database.  ex: ``"person"`` versus `"relief"`)
   - start date
   - end date
   - team members  (A series of nested team members)
      - person name
      - role (Ex: `"Team Leader"`, `"Team Member"`, `"Doctor"`, `"Dentist"`,  `"Nurse"`)
      - PersonID (The `_id` value of a person document. )
      - objectives (A series of nested relief effort objectives)
         - ID
         - name
         - type (Ex: `"primary"`, `"secondary"`)
         - description
         - completed (Ex: True or False)
         - success factor (The higher the number the greater the success. Ex:  1,2,3,4,5)

<div class="tonic">
<pre>
const testcallback = require("notebook")("tripott/dbs-and-docs-test-bulkget/latest");

</pre>
</div>

[Home](/)  |  [Back](/dbs-and-docs/7)  |  [Next](/dbs-and-docs/9)   
