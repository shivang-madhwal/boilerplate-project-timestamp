// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date", function (req, res) {
	let passedDate = req.params.date;
	console.log(passedDate);
	if (parseInt(passedDate) > 10000) {
		let date = new Date(parseInt(passedDate));
		res.json({
			unix: date.getTime(),
			utc: date.toUTCString(),
		});
	}

	let date = new Date(passedDate);
	if (date == "Invalid Date") {
		res.json({ error: "Invalid Date" });
	} else {
		res.json({
			unix: date.getTime(),
			utc: date.toUTCString(),
		});
	}
});

app.get("/api", function (req, res) {
	res.json({
		unix: new Date().getTime(),
		utc: new Date().toUTCString(),
	});
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	// var listener = app.listen(3000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
