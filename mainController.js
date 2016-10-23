var myApp = angular.module('myApp', ['ui.bootstrap']);
myApp.controller('myCtrl', function ($scope,$http) {
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
  $scope.hashtag = " ";
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
          "text":"lol"
        }
      ]
  };
  $scope.showItems = function(snapshot){
    //gets data in database as a list
    var data = snapshot.val();
    //loops over each identifier in database
  }; 

  $scope.toDoDB.on('value', $scope.showItems);

  $scope.sentiment = function(data){
    $scope.sdata = data;
    $scope.original = data;
    var count = 0;
    newData = [];
    while(count<data.length){
      newData.push({'language':'en','id':$scope.sdata[count]['id']+count.toString(),'text':$scope.sdata[count].text});
      count++;
    }
    $scope.req.data = {"documents":newData};
    $http($scope.req).then(function(data,status){
        $scope.sdata = data['data']['documents'];
        loop = 0;
        while(loop<count){
          newData[loop]["score"] = $scope.sdata[loop]["score"];
          newData[loop]["created_at"] = $scope.original[loop]['created_at'];
          if ($scope.original[loop]['user']!=null & $scope.original[loop]['user']['location']!=null){newData[loop]['place'] = $scope.original[loop]['user']['location']
          } else {
            console.log("o7");
          };
          $scope.toDoDB.push(newData[loop]);
          loop++;
        };
        console.log('finished');
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
    url:'http://aamirafridi.com/twitter/?q=%23abc&count=100',
  };

  $scope.search = function(){
    $scope.toDoDB.remove();
    if ($scope.hashtag.charAt(0) == "#") {
      $scope.hashtag = "%23" + $scope.hashtag(1);
    };
    $scope.req2.url = 'http://aamirafridi.com/twitter/?q='+$scope.hashtag+'&lang=en&count=100'
    count = 0;
    while (count < 4) {
      $http($scope.req2).then(function(data,status){
          $scope.data = data.data.statuses;
          $scope.sentiment($scope.data);
        }, function(data){
          console.log(data);
          console.log("ohshit");
        }
      );
      count++;
    };
  };

});