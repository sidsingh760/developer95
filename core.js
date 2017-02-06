/**
 * Created by lcom64_two on 2/6/2017.
 */

var scotchApp = angular.module('scotchApp', ['ngRoute']);
scotchApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: './page/home.html',
            controller: 'HomeController'
        })
        $routeProvider.when('/about', {
            templateUrl: './page/about.html',
            controller: 'AboutController'
        })
        $routeProvider.when('/customer', {
            templateUrl: './page/task2.html',
            controller: 'mainController'
        })
        $routeProvider.when('/login', {
            templateUrl: './page/login.html',
            controller: 'LoginController'
        }).otherwise({
            redirectTo: 'index.html'
        });
    }
]);
// scotchApp.config(function($routeProvider) {
//     $routeProvider
//
//         .when('/about', {
//             templateUrl : 'page/about.html',
//             controller  : 'aboutController'
//         })
//         .when('/', {
//             templateUrl : 'page/login.html',
//             controller  : 'LoginController'
//         })
//         .when('/contact', {
//             templateUrl : 'page/contact.html',
//             controller  : 'contactController'
//         });
// });
scotchApp.controller("LoginController", function ($scope, $location) {
    $scope.login = function () {
        var username = $scope.user.name;
        var password = $scope.user.password;
        if (username == "admin" && password == "admin") {
            $location.path("/customer");
        } else {
            alert('invalid username and password');
        }
    };
});

scotchApp.controller('AboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});
// scotchApp.controller('mainController', function($scope) {
//     $scope.username = "Admin"
//     $scope.password = "Admin"
//
//     $scope.login = function () {
//         console.log("inside....")
//         if($scope.username=="admin" && $scope.password=="admin")
//         {
//             console.log("done....");
//             $window.location.href = '#/customer';
//         }
//     }
// });
scotchApp.controller('HomeController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('mainController', function ($scope, $http) {
    $scope.formData = {};
    $scope.getStates = function () {
        $http.get("http://localhost:8082/cust").then(function(resp){
            $scope.todostate=resp.data;
            console.log($scope.todostate);
        });
    }
    $scope.getStates();

    $http.get("http://localhost:8082/newcust").then(function(resp){
        $scope.todos=resp.data;
    });
    // $http.get('/newcust')
    //     .success(function (data) {
    //         $scope.todonew = data;
    //         console.log(data);
    //     })
    //     .error(function (data) {
    //         console.log('Error: ' + data);
    //     });
});
