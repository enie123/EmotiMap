var myApp = angular.module('myApp', ['ui.bootstrap','ngTwitter']);
myApp.controller('myCtrl', function ($scope,$http,$twitterApi) {
  $scope.sdata = {};
	$scope.config = {
    apiKey: "AIzaSyCxZkuXU1RqMPbUjhOk9b6VIHGhQ3U1BBU",
    authDomain: " twitter-emotions.firebaseapp.com",
    databaseURL: "https://twitter-emotions.firebaseio.com",
    storageBucket: ""
  };
  firebase.initializeApp($scope.config);
  $scope.database = firebase.database();
  $scope.toDoDB = new Firebase('https://twitter-emotions.firebaseio.com/');
  $scope.usersRef = $scope.toDoDB.child("users");

	$scope.data = {
      	"documents": [
      		{
      			"language": "en",
      			"id": "blabbity",
      			"text": "microsoft"
    		},
    		{
     			"language":"en",
      			"id":"es",
    			"text":"fuckfuckfuckfuckfuck"
    		}
  		]
	};
  $scope.showItems = function(snapshot){
    //gets data in database as a list
    var data = snapshot.val();
    //loops over each identifier in database
    for (var identifier in data) {
      console.log("ID: " + identifier); 
      console.log("Timestamp: " + data[identifier].created_at + ", id_str:" + data[identifier].id_str + ", text:" + data[identifier].text);
    }
  }; 

  $scope.toDoDB.on('value', $scope.showItems);
  $scope.getData = 
  $scope.sentiment = function(data){
    $scope.req.data = data;
    $http($scope.req).then(function(data,status){
        console.log(data)
        $scope.sdata = data.documents;
      }, function(){
        console.log("ohshitmuch") 
      });
  };

	$scope.req = {
        method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
        headers: {
          	'Content-Type': "application/JSON",
          	'Ocp-Apim-Subscription-Key': "859de3499a844b26b3e78f9b5710b163"
        },
        data: $scope.data
  };
  $scope.req2 = {
    method: 'POST',
    url:'https://api.twitter.com/1.1/search/tweets.json?q=%23Trump&lang=en&result_type=mixed&count=10',
    headers: {
      'Authorization': 'OAuth oauth_consumer_key="ptdH2GiQQN9QEbSDYL2SpHlWj",oauth_token="789668879089987585-7TarS5fodephtK6TsyMmUIdquPbXJpj",oauth_signature_method="HMAC-SHA1",oauth_timestamp="'+Math.floor(Date.now() / 1000).toString()+'",oauth_nonce="xGVQKu",oauth_version="1.0",oauth_signature="oB5wS5gCVQukxNeSfFh77bis5jA%3D"'
    },
  };

  $scope.req3 = {
    "q":"%23Trump",
    "lang":"en",
    "result_type":"mixed",
    "count":"10"
  };

  $twitterApi.configure("ptdH2GiQQN9QEbSDYL2SpHlWj", 'qZ3yG7n3cGmKhymHV1LFWRMPdi9NOssqCxRyLr2NxPV1BerSIU', "789668879089987585-7TarS5fodephtK6TsyMmUIdquPbXJpj");
  $twitterApi.searchTweets("trump", $scope.req3 );
	$http($scope.req).then(function(data,status){
			console.log(data)

		}, function(){
			console.log("ohshit")	
		}
	);
  $http($scope.req2).then(function(data,status){
      console.log(data);
      console.log("i got dis");
    }, function(data){
      console.log(data);
      console.log("ohshit");
    }
  );

});