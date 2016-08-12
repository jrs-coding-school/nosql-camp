module.exports = bulkAddDriverTest;

//b: { ok: true, index: 2, total_rows: 5, doc_type: "driver"  }

function bulkAddDriverTest(a, b) {
    return function(err, res) {
        if (err === a &&
            res.total_rows === b.total_rows &&
            res.rows[0].doc.doc_type === b.type) {
            console.log('Success!  Done.');
            console.log(res);
        } else {
            console.log('Problem! There was an error:');
            console.log(err);
        }
    };
}
