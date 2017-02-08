/**
 * Created by lcom64_two on 2/6/2017.
 */

var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.bootstrap']);
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

scotchApp.controller('mainController', function ($scope, $http, $modal) {
    $scope.formData = {};
    $scope._id;
    // $scope.getStates = function () {
    //     $http.get("http://localhost:8082/cust").then(function(resp){
    //         $scope.todostate=resp.data;
    //         console.log($scope.todostate);
    //     });
    // }
    // $scope.getStates();

    $http.get("http://localhost:8082/newcust").then(function (resp) {
        $scope.todos = resp.data;
    });

    $scope.getAllcust = function () {
        $http.get("http://localhost:8082/newcust").then(function (resp) {
            $scope.todos = resp.data;
        });
    }
    $scope.createTodo = function () {
        $http.post('http://localhost:8082/newcust', $scope.formData)
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


    $scope.showForm1 = function (id) {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);
        $http.get('http://localhost:8082/newcust/' + id)
            .then(function (response) {
                $scope.editProfiledt = response.data;
                $scope._id = $scope.editProfiledt._id;

            })
        var modalInstance1 = $modal.open({
            templateUrl: './page/deleteProfile.html',
            controller: ModalInstanceCtrl1,
            scope: $scope,
            resolve: {
                id: function () {
                    return id;
                }
            }
        });
    }
    $scope.showForm = function (id) {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);
        $http.get('http://localhost:8082/newcust/' + id)
            .then(function (response) {
                $scope.editProfiledt = response.data;
                $scope._id = $scope.editProfiledt._id;
                $scope.formData =
                    {
                        name: $scope.editProfiledt.name,
                        cname: $scope.editProfiledt.cname.toString()
                    }


            })
        var modalInstance1 = $modal.open({
            templateUrl: './page/editProfile.html',
            controller: ModalInstanceCtrl1,
            scope: $scope,
            resolve: {
                id: function () {
                    return id;
                }
            }
        });
    }
    var ModalInstanceCtrl1 = function ($scope, $http, $modalInstance) {

        $scope.deleteTodo = function () {

            $http.delete('http://localhost:8082/newcust/' + $scope._id)
                .then(function (data) {
                    $scope.getAllcust()
                    $modalInstance.dismiss();
                })
        };


        $scope.upTodo = function () {

            $http.put('http://localhost:8082/newcust/' + $scope._id, $scope.formData)
                .success(function (data) {

                    console.log(data);
                    $scope.getAllcust()
                    $modalInstance.dismiss();
                })
        };


        // var ModalInstanceCtrl1 = function($scope, $http,$modalInstance) {
        //     $scope.deleteTodo = function() {
        //         $http.delete('/http://localhost:8082/newcust/' + $scope.id)
        //             .then(function(data) {
        //                 $scope.todos = data.data;
        //                 console.log(data);
        //                 $modalInstance.dismiss();
        //             })
        //             .error(function(data) {
        //                 console.log('Error: ' + data);
        //             });
        //     };
        $scope.canceldelete = function () {
            $modalInstance.dismiss('cancel');
        };
    }

});
