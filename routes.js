module.exports = function(app) {
	// API Routes
	app.get('/all-visits', function(req, res, next) {
		VisitRecord.allVisits()
		.then(function (data) {
			return res.json(data);
		});
	});

	app.get('/recent-visits', function(req, res, next) {
		VisitRecord.recentVisits()
		.then(function (data) {
			return res.json(data);
		});
	});

	app.get('/user-visits', function(req, res, next) {
		VisitRecord.userVisits(req.query.username)
		.then(function (data) {
			return res.json(data);
		});
	});

	app.get('/popular-visits', function(req, res, next) {
		VisitRecord.popularVisits()
		.then(function (data) {
			return res.json(data);
		});
	});
}