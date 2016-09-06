{
    "_id": "_design/relief-test",
    "_rev": "5-ebcd715b81a491ff87e06bc2d8417b15",
    "language": "javascript",
    "views": {
        "persons-last-first": {
            "map": "function(doc) {if (doc.type === "
            person ") {emit([doc.lastName, doc.firstName], doc.lastName + ', '+ doc.firstName);}}"
        },
        "relief-efforts": {
            "map": "function(doc) {if (doc.type === "
            relief " && doc.name && doc.organizationID) {emit(doc.name, doc.organizationID);}}"
        },
        "persons-email": {
            "map": "function(doc) {if (doc.type === "
            person " && doc.firstName && doc.lastName && doc.email && doc.active ===true) {emit(doc.email, doc.firstName + ' ' + doc.lastName);}}"
        }
    }
}
