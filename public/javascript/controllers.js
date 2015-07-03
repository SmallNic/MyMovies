// var fs = require('fs');
var moviemeApp = angular.module('moviemeApp', [])

moviemeApp.controller('DetailsCtrl', function ($scope, $http){
  $scope.details = JSON.parse(details)

  console.log("CONTROLLER - details1:", $scope.details)
  $scope.$watch("details", function(){
    console.log("CONTROLLER - details2:", $scope.details);
  })
})


moviemeApp.controller('ShowtimesCtrl', function ($scope, $http){
  // $http.get('/showtimes/data').success(function(data){
  //     $scope.showtimes = data
  // })
  // $scope.showtimes = JSON.parse(showtimes)
  $scope.showtimes = showtimes

  console.log("CONTROLLER - showtimes1:", $scope.showtimes)
  $scope.$watch("showtimes", function(){
    console.log("CONTROLLER - showtimes2:", $scope.showtimes);
  })
})

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

  // document.getElementById("submit").addEventListener('click', function() {
  //   setTimeout(function(){
  //     $scope.$apply(function(){
  //       getMovies()
  //     })
  //   }, 5000)
  // });

  $scope.add = function( movie ){
    console.log("New favorite review added:", movie)
    $http.post('/favorites', movie).success(function(data) {
    })
  }

  $scope.addPoster = function( details ){
    console.log("New favorite poster added:", details)
    $http.post('/favorite-movies', details).success(function(data) {
      console.log("CONTROLLER.JS - addPoster() - Successful post")
    })
  }

  $http.get('/favorite-movies-json').success(function(data){
    $scope.favoriteMovies = data
  })

  $scope.faveMovieOrder = 'myJsonProperty.Title';



  $scope.showFavorites = function(){
    $scope.movies = $scope.favorites
  }

  $http.get('/favorites_json').success(function(data) {
      $scope.favorites = data
  })

})
