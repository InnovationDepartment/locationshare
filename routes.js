module.exports = function(app) {
	app.post('/register', function (req, res) {    
    UserRecord.register(req.body, function (err, user) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send();
      }
    });
	});

	app.post('/login', function (req, res) {
    UserRecord.login(req.body, function (err, user) {
      if (user) {
        res.status(200).send();
      } else {
        res.status(400).send();
      }
    })
	});
}