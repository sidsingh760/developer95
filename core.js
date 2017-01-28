/**
 * Created by lcom64_two on 1/25/2017.
 */
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/studs')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


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
                        marks: $scope.edittodos.marks
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