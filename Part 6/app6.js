// up to sec. 7 , lec. 38
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
    
    // this controller is used to run the main.html page. Because the searchResultTemplate directive has been placed on that page, 
    // that means it has access to the $scope service defined here. So variables defined in our scope can be defined in the directive.
    // - sometimes the data in the directive may change the value of the $scope and this behavior may be undesired. Therefore we can 
    //   isolate the scope of the what is in the directive. 
    $scope.person = {
        name: 'Munene Kaumbutho',
        age: 24,
        address: '555 Main St.', 
        city: 'New York',
        state: 'NY'
    }

    //what if we have an array of people:
    $scope.people = [
        {
            name: 'Munene Kaumbutho',
            age: 24,
            address: '555 Main St.', 
            city: 'New York',
            state: 'NY'
        },
        
        {
            name: 'Kimathi Kaumbutho',
            age: 22,
            address: '5423 second St.', 
            city: 'Kansas City',
            state: 'MI'
        },
        {
            name: 'Pascal Kaumbutho',
            age: 58,
            address: '583 Glory Valley', 
            city: 'Nairobi',
            state: '-'
        }
    ];

    //function below to pass to a directive.
    $scope.formattedAddress = function(person){
        return person.address + ' ' + person.city + ' ' + person.state;
    }

    
}]);

app.controller('secondController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    
    
    
}]);


// call the template from another file:
app.directive("searchResultTemplate", function(){
    return {
        restrict: 'AECM', // can say that we want the directive to be used as an element, 'E' or as an attribute, 'A' or both with 'AE'.
                          // 'AE' is what is set by default. 'C' is for getting the template to appear as a class name. 'M' is for a commented out 
                          // directive, that we want to appear.
        templateUrl: 'directives/searchresult.html',
        replace: true, // replace is an attribute that when is set to true, outputs the template above without using the name of the directive. 
                       // This is necessary if our css is being affected by the name of the directive above, and we just want it to outputs
                       // normally. The setting is false by default.
        
        // - a scope object can be created to isolate the scope for this directive to be different from that defined to the controller for the view in 
        //  in which this directive has been placed. placing this attribute will completely isolate the scope of what we find in the controller.
        // - this is great and we can create our own seperate variables for that, which are not defined in the controlers or parent scope. Although Therefore
        //   may be times we want the scopes binded. We can do that by ding 3 things:
        //   1. Setting the scope in the parent in camelcase below - and not setting a value for it but only defining it as text.
        //      - i.e. by using the symbol '@'.
        //   2. giving the directive an attribute in the view not in camelcase i.e. person-name for example.
        //   3. Within the template setting the value to what is defined here in the model 
        scope: {
          personName: '@',
          //or: personNameSpec: '@personName',
          personAge: '@',

          //pass down an object:
          // - we use the '=' sign as a symbol this time. We are pocking a showl in a different way this time.
          personObj: '=',
          formattedAddressFunction: '&' 
        }  
                         
    }
})