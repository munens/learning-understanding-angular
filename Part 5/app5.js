// up to: Sec. 7 lec. 34
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

app.controller('mainController', ['$scope', '$log', function($scope, $log) {
    
    
    
}]);

app.controller('secondController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    
    
    
}]);

// creating a directive - we want to make it simiar to the repeated search results. The searchResult directive here will be
// defined in html as an html tag as 'search-result'.
app.directive("searchResult", function(){
    return {
        restrict: 'AECM', // can say that we want the directive to be used as an element, 'E' or as an attribute, 'A' or both with 'AE'.
                          // 'AE' is what is set by default. 'C' is for getting the template to appear as a class name. 'M' is for a commented out 
                          // directive, that we want to appear.
        template: '<a href="#" class="list-group-item">'+ 
                '<h4 class="list-group-item-heading">Doe, John</h4>'+'<p class="list-group-item-text">555 Main St. New York NY </p>'+
                '</a>',
        replace: true // replace is an attribute that when is set to true, outputs the template above without using the name of the directive. 
                      // This is necessary if our css is being affected by the name of the directive above, and we just want it to outputs
                      // normally. The setting is false by default.
            
        }
})

// call the template from another file:
app.directive("searchResultTemplate", function(){
    return {
        restrict: 'AE', 
        templateUrl: 'directives/searchresult.html',
        replace: true             
    }
})