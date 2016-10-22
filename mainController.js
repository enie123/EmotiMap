var myApp = angular.module('myApp', ['ui.bootstrap']);
myApp.controller('myCtrl', function ($scope,$http) {
  $scope.sdata = {};
	$scope.config = {
    apiKey: "AIzaSyCxZkuXU1RqMPbUjhOk9b6VIHGhQ3U1BBU",
    authDomain: " twitter-emotions.firebaseapp.com",
    databaseURL: "https://twitter-emotions.firebaseio.com",
    storageBucket: "",
    name: "hi"
  };
  firebase.initializeApp($scope.config);
  $scope.hide=true;
  $scope.database = firebase.database();
  $scope.toDoDB = new Firebase('https://twitter-emotions.firebaseio.com/');
  $scope.usersRef = $scope.toDoDB.child("users");
  $scope.hashtag = "";
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
        $scope.sdata = data.documents;
      }, function(){
        console.log("ohshitmuch")
      });
  };


  $scope.req3 = {
    "q":"%23Trump",
    "lang":"en",
    "result_type":"mixed",
    "count":"10"
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
    url:'http://aamirafridi.com/twitter/?q=abc&count=100',
  };

  $scope.req3 = {
    "q":"%23Trump",
    "lang":"en",
    "result_type":"mixed",
    "count":"10"
  };
  $scope.search = function(){
    $scope.hide=false;
    $scope.req2.url = 'http://aamirafridi.com/twitter/?q='+$scope.hashtag+'&count=100'
    $http($scope.req2).then(function(data,status){
        console.log(data);
        $scope.data = data.data.statuses;
        $scope.sentiment($scope.data);
        console.log("i got dis");
      }, function(data){
        console.log(data);
        console.log("ohshit");
      }
    );
  };

});
