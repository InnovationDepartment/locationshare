var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

try {
  require('./secret');
}
catch (err) {
  console.log("ERR: Could not load secret.js");
  console.log(err);
}

require('./routes')(app);
require('./db/db');

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(port);
console.log('App listening on port ' + port);