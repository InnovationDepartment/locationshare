window.socket = io();
// window.socket = io('localhost:3000');

// window.socket = io();
socket.on('connect', function() {
  console.log('connect');
});

var visits = [];
var processVisit = function (visit) {
  visits.unshift(visit);
  if (visits.length > 4) {
    visits.pop();
  }
  for(var i = 0; i < visits.length; i++) {
    $('#user' + i).html(visits[i].username);
    $('#frame' + i).attr('src', visits[i].url);
  }
}

socket.on('new-visit', function (visit) {
  processVisit(visit);
});


window.everybodyNav = function (url) {
  socket.emit('nav', url);
}

