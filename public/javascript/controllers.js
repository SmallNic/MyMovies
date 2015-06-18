// var fs = require('fs');
var moviemeApp = angular.module('moviemeApp', [])

moviemeApp.controller('MovieListCtrl', function ($scope, $http){

  // $scope.movies = JSON.parse(fs.readFileSync('./movieList.json'));

  $http.get('/movies').success(function(data) {
    data = JSON.parse(data)
    $scope.movies = data["results"]
    // console.log("CONTROLLER.js data: ", data)
    // console.log("CONTROLLER.js data['num_results']: ", data['num_results'])
    // console.log("CONTROLLER.js data[\"num_results\"]: ", data["num_results"])
    // console.log("CONTROLLER.js data.num_results: ", data.num_results)
  })

  // $scope.movies = null;

  // $http.get('movies')
    //  .then(function(res){
    //     $scope.movies = JSON.parse(res.data);
    //   });

  /*
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
  */

})
