function divideByTwo (value, callback) {
  value =  value / 2;
  if (value  < 3) {
    callback("Snap!", null);
  } else {
    callback(null, value);
  }
}

function doSomething (value) {
  divideByTwo(value, function(err, result) {
    if (err) {
      //...Bad times, do something ...
      console.log("Bad times...", err, " ,man.");
    }
    if (result) {
      // ..Good times...do something ...
      console.log("Good times...", result);
    }
  });
}

console.log("Here's the value: ", doSomething(10));
