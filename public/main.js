window.socket = io();
// window.socket = io('localhost:3000');

// window.socket = io();
socket.on('connect', function() {
  console.log('connect');
});

var processVisit = function (visit) {
  $('#user').html(visit.username);
  $('#link').html(visit.url);
  $('#link').attr('href', visit.url);
  $('#frame').attr('src', visit.url);
}

socket.on('new-visit', function (visit) {
  processVisit(visit);
});


var everybodyNav = function (url) {
  socket.emit('nav', url);
}

