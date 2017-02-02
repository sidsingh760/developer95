/**
 * Created by lcom64_two on 1/25/2017.
 */

var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/studs')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $http.get('/state')
        .success(function(sdata) {
            $scope.todostate = sdata;
            console.log(sdata);
        })
        .error(function(sdata) {
            console.log('Error: ' + sdata);
        });

    $scope.fillcity = function(id) {
        $http.get('/city/' + id)
            .success(function(data) {
                $scope.citys = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // $http.get('/city')
    //     .success(function(cdata) {
    //         $scope.todocity = cdata;
    //         console.log(cdata);
    //     })
    //     .error(function(cdata) {
    //         console.log('Error: ' + cdata);
    //     });

    $scope.deleteTodo = function(id) {
        $http.delete('/studs/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.editTodo = function(sid) {
        $http.get('/studs/'+ sid)
            .success(function(datas) {
                $scope.edittodos = datas;
                $scope._id = $scope.edittodos._id;
                console.log(datas);
                $scope.formData =
                    {
                        // _id: $scope.edittodos._id,
                        name: $scope.edittodos.name,
                        email: $scope.edittodos.email,
                        state: $scope.edittodos.state,
                        city: $scope.edittodos.city,
                        date: $scope.edittodos.date,
                        gender: $scope.edittodos.gender
                    }
                console.log(datas);
            })
            .error(function(datas) {
                console.log('Error: ' + datas);
            });
    };
    $scope.updateTodo = function() {
        console.log($scope._id);
        $http.put('/studs/' + $scope._id, $scope.formData)
            .success(function(data1) {
                //$scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data1;
                console.log(data1);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.createTodo = function() {
        $http.post('/studs', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}