/**
 * Created by lcom64_two on 1/25/2017.
 */

var scotchTodo = angular.module('app');

scotchTodo.controller('mainController',function ($scope,$http) {
    $scope.formData = {};
    $scope.v = "gdgsdfg";

    $http.get("http://localhost:8090/studs").then(function(resp){
        $scope.todos=resp.data;
    });
    //$scope.todostate=[];
    $scope.getStates = function () {
//$http..get()
        $http.get("http://localhost:8090/state").then(function(response){
            $scope.todostate=response.data;
           // $scope.todostate = [{"sname":"Gujarat"},{"sname":"MH"},{"sname":"MP"}];
            console.log($scope.todostate);
        });
    }
    $scope.getStates();

    $scope.fillcity = function(id) {
        $http.get('/city/' + id)
            .then(function(data) {
                $scope.citys = data.data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteTodo = function(id) {
        $http.delete('/studs/' + id)
            .then(function(data) {
                $scope.todos = data.data;
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
            .then(function(datas) {
                $scope.edittodos = datas.data;
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
                        gender: $scope.edittodos.gender,
                        active: $scope.edittodos.active,
                        pimg: $scope.edittodos.pimg
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
})