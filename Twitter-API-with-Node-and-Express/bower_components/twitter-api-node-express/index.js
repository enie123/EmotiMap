module.exports = require('./node_modules/twitter-js-client/lib/Twitter');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var config = {
    "consumerKey": "ptdH2GiQQN9QEbSDYL2SpHlWj",
    "consumerSecret": "qZ3yG7n3cGmKhymHV1LFWRMPdi9NOssqCxRyLr2NxPV1BerSIU",
    "accessToken": "789668879089987585-7TarS5fodephtK6TsyMmUIdquPbXJpj",
    "accessTokenSecret": "gLW66C4FaCuBZFNZTwK2cE1BBd8vbweCCe8Nx132HwNSD"
};

var twitter = new module.exports.Twitter(config);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/*
 * To connect to a front end app (i.e. AngularJS) store all your files you will *
 * statically store in declared below (i.e. ./public) *
*/

app.use(express.static('public'));

//post to retrieve user data
app.post('/twitter/user', function (req, res) {
	var username = req.body.username;
	var data = twitter.getTweet({q: '%23CLINTON', lang: 'en', count: 10 }, function(error, response, body){
		res.send({
			"error" : error
		});
	}, function(data){
		res.send({
			result : {
				"userData" : data
			}
		});
	});
});



var server = app.listen(3000, function () {
  	var host = server.address().address;
  	var port = server.address().port;
});
