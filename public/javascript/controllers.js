// var fs = require('fs');
var moviemeApp = angular.module('moviemeApp', [])

moviemeApp.controller('MovieListCtrl', function ($scope, $http){

  $scope.orderProp = 'display_title';
  // $scope.movies = null;

  // $http.get('movies')
    //  .then(function(res){
    //     $scope.movies = JSON.parse(res.data);
    //   });



  getMovies();

  function getMovies(){
    $http.get('/movies').success(function(data) {
      data = JSON.parse(data)
        $scope.movies = data["results"]
    })
  }

  document.getElementById("submit").addEventListener('click', function() {
    setTimeout(function(){
      $scope.$apply(function(){
        getMovies()
      })
    }, 5000)
  });

  $scope.add = function( movie ){
    console.log("New favorite review added:", movie)
    $http.post('/favorites', movie).success(function(data) {
    })
  }

  $scope.showFavorites = function(){
    $scope.movies = $scope.favorites
  }

  $http.get('/favorites_json').success(function(data) {
      $scope.favorites = data
  })

})
