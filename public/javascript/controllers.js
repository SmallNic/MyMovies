var moviemeApp = angular.module('moviemeApp', [])

moviemeApp.controller('MovieListCtrl', function ($scope, $http){

  getMovies();

  function getMovies(){
    $http.get('/movies').success(function(data) {
      $scope.movies = data
      console.log("CONTROLLER.js data: ", data)
    })
  }

  document.getElementById("submit").addEventListener('click', function() {
    setTimeout(function(){
      $scope.$apply(function(){
        getMovies()
      })
      }, 10000)
  });

})
