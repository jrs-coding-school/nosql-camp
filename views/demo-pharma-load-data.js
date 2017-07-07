const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const couch_base_uri = "http://127.0.0.1:3000/"
const couch_dbname = "pharmacy-test"
const db = new PouchDB(couch_base_uri + couch_dbname)

let pharmaData = [{
  "_id": "meds_patient_adams_gomez_6664_1239484_2017-2-05T14:48:00.000Z",

  "patientID": "patient_adams_gomez_6664_1239484",
  "pharmacyID": "pharmacy_cvs_1001",
  "dispensedDate": "2017-2-05T14:48:00.000Z",
  "medsDispensed": [
    {
      "name": "Lisinopril",
      "dosage": "20mg",
      "frequency": "daily"
    },
    {
      "name": "Metoprolol XL",
      "dosage": "50mg",
      "frequency": "daily"
    },
    {
      "name": "Furosemide",
      "dosage": "40mg",
      "frequency": "twice daily"
    },
    {
      "name": "Spironolactone",
      "dosage": "50mg",
      "frequency": "daily"
    },
    {
      "name": "Clopidogrel",
      "dosage": "75mg",
      "frequency": "daily"
    },
    {
      "name": "Amlodipine",
      "dosage": "10mg",
      "frequency": "twice daily"
    },
    {
      "name": "Atorvastatin",
      "dosage": "40mg",
      "frequency": "daily"
    },
    {
      "name": "Paroxetine",
      "dosage": "20mg",
      "frequency": "daily"
    },
    {
      "name": "Alprazolam",
      "dosage": "0.5mg",
      "frequency": "daily"
    },
    {
      "name": "Omeprazole",
      "dosage": "20mg",
      "frequency": "daily"
    }
  ]
},
{
  "_id": "meds_patient_adams_gomez_6664_1239484_2017-3-01T14:01:05.000Z",

  "patientID": "patient_adams_gomez_6664_1239484",
  "pharmacyID": "pharmacy_cvs_1001",
  "dispensedDate": "2017-3-01T14:01:05.000Z",
  "medsDispensed": [
    {
      "name": "Lisinopril",
      "dosage": "20mg",
      "frequency": "daily"
    },
    {
      "name": "Alprazolam",
      "dosage": "0.5mg",
      "frequency": "daily"
    },
    {
      "name": "Omeprazole",
      "dosage": "20mg",
      "frequency": "daily"
    }
  ]
},
{
  "_id": "meds_patient_jones_james_1263_1239483_2017-01-12T13:40:00.000Z",

  "patientID": "patient_jones_james_1263_1239483",
  "pharmacyID": "pharmacy_cvs_1001",
  "dispensedDate": "2017-2-05T14:48:00.000Z",
  "medsDispensed": [
    {
      "name": "Clopidogrel",
      "dosage": "75mg",
      "frequency": "daily"
    },
    {
      "name": "Amlodipine",
      "dosage": "10mg",
      "frequency": "twice daily"
    },
    {
      "name": "Atorvastatin",
      "dosage": "40mg",
      "frequency": "daily"
    },
    {
      "name": "Paroxetine",
      "dosage": "20mg",
      "frequency": "daily"
    },
    {
      "name": "Alprazolam",
      "dosage": "0.5mg",
      "frequency": "daily"
    },
    {
      "name": "Omeprazole",
      "dosage": "20mg",
      "frequency": "daily"
    }
  ]
},
{
  "_id": "meds_patient_jones_james_1263_1239483_2017-02-13T11:40:00.000Z",

  "patientID": "patient_adams_gomez_6664_1239484",
  "pharmacyID": "pharmacy_cvs_1001",
  "dispensedDate": "2017-02-13T11:40:00.000Z",
  "medsDispensed": [
    {
      "name": "Lisinopril",
      "dosage": "20mg",
      "frequency": "daily"
    },
    {
      "name": "Spironolactone",
      "dosage": "50mg",
      "frequency": "daily"
    },
    {
      "name": "Clopidogrel",
      "dosage": "75mg",
      "frequency": "daily"
    },
    {
      "name": "Amlodipine",
      "dosage": "10mg",
      "frequency": "twice daily"
    },
    {
      "name": "Omeprazole",
      "dosage": "20mg",
      "frequency": "daily"
    }
  ]
},
{
  "_id": "meds_patient_sanders_sandy_9732_1239484_2017-2-08T12:48:00.000Z",

  "patientID": "patient_sanders_sandy_9732_1239484",
  "pharmacyID": "pharmacy_walmart_2000",
  "dispensedDate": "2017-2-08T12:48:00.000Z",
  "medsDispensed": [
    {
      "name": "Atorvastatin",
      "dosage": "40mg",
      "frequency": "daily"
    },
    {
      "name": "Paroxetine",
      "dosage": "20mg",
      "frequency": "daily"
    },
    {
      "name": "Alprazolam",
      "dosage": "0.5mg",
      "frequency": "daily"
    },
    {
      "name": "Omeprazole",
      "dosage": "20mg",
      "frequency": "daily"
    }
  ]
},
{
  "_id": "patient_adams_gomez_6664_1239484",

  "patientNumber": "1239484",
  "firstName": "Gomez",
  "lastName": "Adams",
  "age": 70,
  "gender": "M",
  "ethnicity": "H",
  "last4SSN": "6664",
  "conditions": [
    "Anxiety",
    "Hypertension",
    "Hyperthyroid"
  ]
},
{
  "_id": "patient_jones_james_1263_1239483",

  "patientNumber": "1239483",
  "firstName": "James",
  "lastName": "Jones",
  "age": 55,
  "gender": "M",
  "ethnicity": "AA",
  "last4SSN": "5543",
  "conditions": [
    "hypertension"
  ]
},
{
  "_id": "patient_sanders_sandy_9732_1239484",

  "patientNumber": "1239484",
  "firstName": "Sandy",
  "lastName": "Sanders",
  "age": 63,
  "gender": "F",
  "ethnicity": "C",
  "last4SSN": "9732",
  "conditions": [
    "diabetes"
  ]
},
{
  "_id": "patient_smith_judy_2342_1239482",

  "patientNumber": "1239482",
  "firstName": "Judy",
  "lastName": "Smith",
  "age": 60,
  "gender": "F",
  "ethnicity": "C",
  "last4SSN": "2342",
  "conditions": [
    "hypertension",
    "anxiety",
    "diabetes",
    "hyperthyroid"
  ]
},
{
  "_id": "pharmacy_cvs_1001",

  "storeNumber": "1001",
  "storeChainName": "CVS",
  "zipCode": "29464",
  "streetAddress": "2000 Belle Hall Lane"
},
{
  "_id": "pharmacy_cvs_1002",

  "storeNumber": "1002",
  "storeChainName": "CVS",
  "zipCode": "29466",
  "streetAddress": "2000 Basket Makers Lane"
},
{
  "_id": "pharmacy_walmart_2000",
  
  "storeNumber": "2000",
  "storeChainName": "Walmart",
  "zipCode": "29466",
  "streetAddress": "150 Mockingbird Lane"
}]



// put the documents into the database with a single call to bulkDocs();
db.bulkDocs(pharmaData, function(err, response) {
    if (err) return console.log(err)
    if (response) {
        // call bulkGet() with an array of id and rev pairs representing the revisions to fetch.
        //  The response from bulkDocs is an array of objects containing id and rev properties.
        db.bulkGet({
            include_docs: true,
            docs: response
        }, function(err, res) {
            if (err) {
                return console.log(err);
            }
            if (res) {
                return console.log("bulkGet response: ", JSON.stringify(res, null, 2));
            }
        });
    }
});
