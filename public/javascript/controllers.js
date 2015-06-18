var customInterpolationApp = angular.module('moviemeApp', []);

 customInterpolationApp.config(function($interpolateProvider) {
   $interpolateProvider.startSymbol('{[{');
   $interpolateProvider.endSymbol('}]}');
 });

var moviemeApp = angular.module('moviemeApp', [])

moviemeApp.controller('MovieListCtrl', function ($scope, $http){
  $http.get('/movies').success(function(data) {
    $scope.people = data
    console.log("data: ", data)
  })
})


// function UserTwoCtrl($scope, $http) {
//   $http.get('/results').success(function(data) {
//     $scope.movies = data
//   })
// }
