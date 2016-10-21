// section 1-4: lecture 17

// to use angular we can create a global angular object, used from the src="https://code.angularjs.org/1.3.0-rc.1/angular.min.js".
// the entire view that this is related to is the place in the html written ng-app, which is set to 'app' and matches the value here. 
var app = angular.module('app', ['ngMessages', 'ngResource']); // we also have an array of dependencies. For example we placed our messagng service in the html.
                                                 // we can therefore list it here as a module to use as a dependency.

// create a controller for the view. A controller matches the model with the view and vice versa.
// Where is the view set? - look for ng-controller="mainController" inside the index.html.
// angular will control that div or part of the html page from here:
// - a controller uses $scope, an object which comes from the scope service and uses a dependency injection.
//   THe $scope here is passed by angular as dependency injection into the function.
// - the scope can be seen as an object that binds what is seen in the view to what is given in the controller. 
//   How is this done? any time a function like below that is anonymous is called in angular , it runs the 
//   function, angular.injector().annotate('.. name-of-function ..'), which returns a array of parameters. When it
//   notices that one of them is called '$scope', then it knows to create a $scope service object. A lot of ofther services in 
//   angular work in this way, such as $http, $log, $location etc.
app.controller('mainController', function($scope, $log, $filter, $timeout){
    console.log($scope);

    // We can concatenate variable, name - to the scope, i.e.
    $scope.name = "John Doe";

    //Or any ohter variables we want:
    $scope.occupation = "programmer";

    // or functions:
    $scope.getName = function(){
        console.log($scope.name);
        return $scope.name; // or: this.name
    }

    $scope.getName();

    // other services: $log
    // the log service simply logs information to our console. it has a info, warn, debug, error, among other methods that log information
    // to the console, but in other ways.
    $log.log("Hello");
    $log.info("this is some information");
    $log.warn("this is a warning");
    $log.debug("this is some debugging information");
    $log.error("this places some error information on the console, appearing in red.")

    // other services: $filter
    // this filters some information.
    // e.g. we can filter $scope.name to be uppercase:
    $scope.formattedName = $filter('uppercase')($scope.name); //gives us the $scope.name in uppercase.
    $log.info($scope.formattedName);

    // lets add some text onto the actual html.
    // by concatenating a value to the scope we are making it available to the html where our controller is specified/ attached:
    // this value will be interpolated by angular in the html doc.
    // - this is how the scope matches the controller and the view.
    $scope.name = "Munene";

    // we can use the $timeout function here similar to the setTimeout function to chance the variable name cofined to the scope.
    $timeout(function(){
        $scope.name = "Josiah";
    }, 3000);

});

/*
// How to apply minification to a controller:
// the format here allows the constroller beolow to be applied in minified form. 
// By the elements in the array, being the same as what is added into the function then it can angular can call the last element in the array,
// as a function while it has been turned into its minified form. The miifier cant change the values inside a string so the elements in the function
// can be given the string values no matter what name they are given in minified form.
// - this works as long as th order of elements in the array is the same order in which they are declared in the function. 
app.controller('minifiedController', ['$scope', '$log', function($scope, $log){

}])
*/