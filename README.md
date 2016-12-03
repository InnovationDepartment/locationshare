#### WindowDotLocation Api

This is a websocket supported chrome extension api to share you online goings ons.

to create a visit just use:
`socket.emit('visit', { username: '<your username>', url: '<url>' })`

to receive visits:
`socket.on('new-visit', function (visit) {})`
// visit -> { usersname, url }


