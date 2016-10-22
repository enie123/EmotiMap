var myApp = angular.module('myApp', ['ui.bootstrap']);
myApp.controller('myCtrl', function ($scope,$http) {
	
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
		});
});