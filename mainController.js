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


  $scope.req3 = {
    "q":"%23Trump",
    "lang":"en",
    "result_type":"mixed",
    "count":"10"
  };
  console.log('hi');
  $.getJSON('/hackharvard/twitter-proxy.php?url='+encodeURIComponent('search/tweets.json?q=%23QED&lang=en&result_type=mixed&count=10'), function() {
  console.log( "success" );
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })

  $twitterApi.configure("xvz1evFS4wEEPTGEFPHBog", 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw', "7370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb");
  $scope.search = function(){
    $twitterApi.searchTweets("trump", $scope.req3 ).then(function(data){console.log(data)},function(data){console.log(data.toString())});
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

  $http($scope.req2).then(function(data,status){
      console.log(data);
      console.log("i got dis");
    }, function(data){
      console.log(data);
      console.log("ohshit");
    }
  );

});