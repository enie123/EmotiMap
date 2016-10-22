var myApp = angular.module('myApp', ['ui.bootstrap']);
myApp.controller('myCtrl', function ($scope,$http) {
  $scope.data = {};
	$scope.config = {
    apiKey: "AIzaSyCxZkuXU1RqMPbUjhOk9b6VIHGhQ3U1BBU",
    authDomain: " twitter-emotions.firebaseapp.com",
    databaseURL: "https://twitter-emotions.firebaseio.com",
    storageBucket: ""
  };

  firebase.initializeApp($scope.config);
  firebase.auth().signOut().then(function() {
    }, function(error) {
  });

  $scope.database = firebase.database();
  $scope.toDoDB = new Firebase('https://twitter-emotions.firebaseio.com/');
  $scope.usersRef = $scope.toDoDB.child("users");
  $scope.showItems = function(snapshot){
    var data = snapshot.val();
      for (var identifier in data) {
        console.log("Name: ", identifier);
          for (var index in data[identifier]) {
            console.log(data[identifier][index]["task"], " for ", data[identifier][index]["reps"], " reps");
          }
      }
  };
  $scope.toDoDB.on('value', $scope.showItems);
  $scope.addItem = function(tweet){
    var tweetID = $("#tweetID").val();
    var newtweet = {"coordinates": tweet.statuses[0].coordinates, "time": tweet.statuses[0].created_at, "text": tweet.statuses[0].text};
    alert(tweetID);
    toDoDB.child(tweetID).push(newtweet);
    location.reload();
  };
 
  $scope.parsetweets = function(){
    var json = 'tweets.json',
    obj = JSON.parse(json);
    console.log('done');
  };

  $scope.parsetweets();

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
  $scope.sentiment = function(data){
    $scope.req.data = data;
    $http($scope.req).then(function(data,status){
        console.log(data)
        $scope.data = data;
      }, function(){
        console.log("ohshit") 
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

	$http($scope.req).then(function(data,status){
			console.log(data)
		}, function(){
			console.log("ohshit")	
		}
	);

});