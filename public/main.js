window.socket = io();
// window.socket = io('localhost:3000');

// window.socket = io();
socket.on('connect', function() {
  console.log('connect');
});



socket.on('new-visit', function (visit) {
  var $iframe = $('iframe');

  var $holder = $('div');

  var $title= $('h1')

  $title.html(visit.username);

  $holder.append($title);
  $holder.append($iframe);

  $('body').prepend($holder);
});