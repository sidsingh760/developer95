/**
 * Created by lcom64_two on 1/25/2017.
 */
function mainController() {
    // function mainController($scope)
    // $scope.name = 'aish'
    // $scope.likes = ['pizza','pasta'];
    this.fav = [{
        title: ' la la land',
        year: '2017',
        popular: true
    }, {
        title: 'narnia',
        year: '2007',
        popular: false
    }];
}
angular
    .module('app')
    .controller('mainController', mainController);