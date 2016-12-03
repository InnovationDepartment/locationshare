window.socket = io();
// window.socket = io('localhost:3000');

// window.socket = io();
socket.on('connect', function() {
  console.log('connect');
});

var processVisit = function (visit) {
   var $iframe = $('<iframe />');

  $iframe.attr('src',visit.url);
  var $holder = $('<div />');

  var $title= $('<h1 />')

  $title.html(visit.username);

  $holder.append($title);
  $holder.append($iframe);

  $('#content').prepend($holder);
}

socket.on('new-visit', function (visit) {
  processVisit(visit);
});

