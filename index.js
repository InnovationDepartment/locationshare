var express = require('express');
var app = express();

try {
  require('./secret');
}
catch (err) {
  console.log("ERR: Could not load secret.js");
}

require('./db/db');

var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;
var  fs = require('fs');

var path = '/etc/letsencrypt/live/www.windowdotlocation.club/';

mainDb.sync().then(function () {
  try {
      var options = {
        key: fs.readFileSync(`${path}privkey.pem`),
        cert: fs.readFileSync(`${path}cert.pem`),
      };
      require('https').createServer(options,app).listen(443, function(){
        console.log("Express server listening on port " + 443);
      });
  } catch (er) {
      
  }
  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  socket.on('register', function (data) {
    UserRecord.register(data).then(function (user) {
      socket.emit('registered', user);
    }).catch(function (err) {
      socket.emit('register-fail', err);
    })
  });

  socket.on('visit', function (data) {
    console.log(data);
    VisitRecord.create(data);

    socket.broadcast.emit('new-visit', data);
  });
});