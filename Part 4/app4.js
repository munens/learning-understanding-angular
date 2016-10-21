
var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    
    $routeProvider
  
    .when('/', {
        templateUrl: './pages/main.html',
        controller: 'mainController'
    })
    
    .when('/second', {
        templateUrl: './pages/second.html',
        controller: 'secondController'
    })
    
    .when('/second/:num', {
        templateUrl: './pages/second.html',
        controller: 'secondController'
    })
    
});

// singleton: the $log object is a single JS object. This is why there is an instance of main and second that appear when 
//            the console is run when either controller is run. This actuallly saves a lot of memory and is a lot diferent
//            to the $scope because:
//          - the $scope service on the other hand is not a singleton and is actuallly a child of the $rootScope object.
//            Every controller actuallly gets its own scope. This is why when we $log.log($scope), in the either controller 
//            we get seperate instances of the scope.
//          - Also any service that we create in angular is also a singleton. A service is a peice of functionality or data
//            that can be shared accross pages in our application.
//          - to apply service in a controller then I will call it just like I call any other singleton objects like $log, rou-
//            teParams, $timeout etc.
//          - Singletons are great becuase haveing one instance of an object throughout an application as we navigate from page to
//            page means that no instance of that object will have to be made as we move away and back to a page. the singleton holds
//            the same javascript memory space as I navigate through the application and most importantly because we are in a single  
//            page application - so newer instances of objects dont have to be made.
//          - therefore one can share information accross pages using services, us that information wont be lost. 
//          - Factories are mostly just like services too
app.service('nameService', function(){

    this.name = 'John Doe';
    this.nameLength = function(){
        return this.name.length;
    }

});


app.controller('mainController', ['$scope', '$log', 'nameService', function($scope, $log, nameService) {
    
    $scope.name = nameService.name;

    //$log.main = 'Property from main'; // sec. 6 lec 29
    //$log.log($log); // sec. 6 lec 29

    $log.log(nameService);
    $log.log(nameService.nameLength());

    // below we are trying to maintain the cvalue of the name as we navigate around, according to how it is changed as we move from page to page.
    // The $watch method in angular allows us to manually 'watch' a variable. In this way we can manually set the scope value to the nameService value
    // for which the name can be pulled from the nameService with the latest version of the name that can be used. This works because the nameService is
    // a singleton.There is one edition of the nameService throughout the application that is only taking a single space in memory. 
    $scope.$watch('name', function(){
        nameService.name = $scope.name;
    })

}]);



app.controller('secondController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams, nameService) {
    
    $scope.num = $routeParams.num || 1;

    $scope.name = nameService.name;
    
    //$log.second = 'Property from second'; // sec. 6 lec 29
    //$log.log($log); // sec. 6 lec 29
    
    $scope.$watch('name', function(){
        nameService.name = $scope.name;
    })

}]);

