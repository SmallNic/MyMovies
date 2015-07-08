// var fs = require('fs');
var moviemeApp = angular.module('moviemeApp', [])

moviemeApp.controller('DetailsCtrl', function ($scope, $http){
  $scope.details = JSON.parse(details)

  console.log("CONTROLLER - details1:", $scope.details)
  $scope.$watch("details", function(){
    console.log("CONTROLLER - details2:", $scope.details);
  })
})

moviemeApp.controller('MovieListCtrl', function ($scope, $http){

  $scope.orderProp = 'display_title';
  $scope.posterOrder = 'myJsonProperty.Title'

  $scope.add = function( movie ){
    console.log("New favorite review added:", movie)
    $http.post('/favorites', movie).success(function(data) {
    })
  }

  $scope.remove = function( movie ){
    console.log("Movie removed:", movie)
    $http.post('/remove', movie).success(function(data) {
      $http.get('/favorite-movies-json').success(function(data){
        $scope.favoriteMovies = data
      })
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

})
