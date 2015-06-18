var moviemeApp = angular.module('moviemeApp', [])

moviemeApp.controller('MovieListCtrl', function ($scope, $http){

  getMovies();

  function getMovies(){
    $http.get('/movieList').success(function(data) {
      $scope.movies = data
      console.log("data: ", data)
    })
  }

  document.getElementById("submit").addEventListener('click', function() {
    $scope.$apply(function() {
      console.log("you performed a search");
      getMovies()
    });
  });

  // $scope.movies = function($http){
  //   return $http.get('/movieList').success(function(data){
  //     console.log("read from file")
  //     return data
  //   })
  // }()
  // console.log("data: ", data)
})


// function UserTwoCtrl($scope, $http) {
//   $http.get('/results').success(function(data) {
//     $scope.movies = data
//   })
// }
