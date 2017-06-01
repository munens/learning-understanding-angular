
// here we have added the angular routing module to our application. The routing works by taking whatever is after the '#' value and run
// the appropriate controller and html:
var myApp = angular.module('myApp', ['ngRoute']);

// we implement the routing module above by doing the following:
myApp.config(function($routeProvider) {
	// $routeProvider allows us to specify routes and what we should do with them after - and also recoginse patterns:
	// - it basically specifies what the app should do based on the particular route we receieve.
	$routeProvider
	// below this shows that when we get the '/' route , which template should be loaded and which controller should be used:
	.when('/', {
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})

	.when('/second', {
		templateUrl: 'pages/second.html',
		controller: 'secondController' 
	})

	//suppose we want a page based on a query string - i.e. a page that regards a specific user for example:
	// - here we can specify the controller and template to use for this.
	.when('/second/:id', {
		templateUrl: 'pages/second.html',
		controller: 'secondController'
	})
});

// 2 different controlers are displayed here such that the $scope object has a different value for each.
myApp.controller('mainController', ['$scope', '$location', '$log', function($scope, $location, $log) {
    
	$scope.name = "Munene";

	// if we lodge a route such as 'http:www.hello.com/#/feedback', the following below would be able to extract anything after the 
	// '#'. Therefore we would get '/feedback', back.
	// $log.info($location.path());
    
}]);

// You'll notice the controller we are using here is based on the secnod.html template and 'second/' or 'second/:id' route in the config function:
// - to access the 'id' that comes with the route we use the 'routeParams' object.
myApp.controller('secondController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {

	$routeParams.id = $scope.id;

	$scope.name = "Kaumbutho";

}])
