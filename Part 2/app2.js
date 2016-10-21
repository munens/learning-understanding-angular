// section 4-5: lecture 25

var app = angular.module('app', []); 

app.controller('mainController', ['$scope', '$filter', '$timeout', '$http', function($scope, $filter, $timeout, $http){
    // two way binding: the value of 'jina' here will affect the value of the variable 'jina', in the view and
    // the value of the variable in the 'view'' will affect the value of 'jina' in the model here.  
    $scope.jina = '';
    $scope.lower_jina = function(){
        return $filter('lowercase')($scope.jina);
    } 

    // let us watch the digest loop, for how our variable jina changes:
    // - any changes in the event loop are registered by angular which then checks to see if any of the elements recognised 
    //   as part of the scope has been affected. angular checks and compares the old value and the new value - this is entering the 
    //   digest loop. If this affects anything in the DOM, code etc. then the loop will run again until there is no difference in the
    //   old vs new values.  
    $scope.$watch('jina', function(newValue, oldValue){
        console.log('Changed');
        console.log('old: ', oldValue);
        console.log('new: ', newValue);
    });

    /*
    //some things we try and do n angular dont full work out. Lets try the following:
    setTimeout(function(){
        $scope.jina = "jina mpya ni Munene"
        console.log("has changed");
    }, 3000);
    // the new scope value has failed to update. We have to set up everything differently to get it to work.
    // i.e. the $apply method will place all the actions within it into a angular context that the setTimeout function by itself cant
    //      do.
    setTimeout(function(){
        $scope.$apply(function(){
            $scope.jina = "jina mpya ni Munene"
            console.log("has changed");
        })
    }, 3000);
    */

    // so in order to get things to work properly and normally, we have to use the $timeout function.
    $timeout(function(){
        $scope.jina = "jina mpya ni Munene"
        console.log("has changed");
    }, 3000);
    // what does this mean? - You to fully work with angularjs in order to fully take advantage of using it.

    // for our ng-if, ng-show and ng-hide directives.
    $scope.characters = 5;

    // for the use of our ng-repeat directive:
    $scope.rules = [
        {ruleName: "must be 5 characters in length"},
        {ruleName: "must sound cool"},
        {ruleName: "must be unique"}
    ]

    $scope.alertClick = function(){
        alert("hello");
    }

    var url = ""; 

    /*
    // building an XMLHttpRequest:
    var rulesRequest = new XMLHttpRequest();
    rulesRequest.onreadystatechange = function(){
        $scope.$apply(function(){
            if(rulesRequest == 4 && rulesRequest.status == 200){
                $scope.rules = JSON.parse(rulesRequest.responseText);
            }
        })
    }

    rulesRequest.open("GET", url, true);
    rulesRequest.send();
    */

    // the angular $http object is a wrapper for the code above and allows us to make http requests within the angular context:
    $http.get(url)
        .success(function(result){
            $scope.rules = result;
        })
        .error(function(data, status){
            console.log(data);
        })

    $scope.newRule = '';

    $scope.addRule = function(){
        $http.post(url, {newRule: $scope.newRule})
            .success(function(result){
                $scope.rules = result;
            })
            .error(function(data, success){
                console.log(data)
            })
    }


}]);

