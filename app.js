var express = require('express');
var app = express();

var port = process.env.PORT || 5000;
require('./routes.js')(app);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port);
console.log('App listening on port ' + port);