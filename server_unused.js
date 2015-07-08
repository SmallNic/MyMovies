//Instantiate Express
var express = require("express")
var app = express()
var server = require("http").createServer(app)

//Instantiate Handlebars
var hbs = require("hbs")
app.set("view engine", "hbs")

// Instantiate Body Parser
var bodyParser = require("body-parser")
app.use(bodyParser.json())//handles json POST requests
app.use(bodyParser.urlencoded({ extended:true }) ) //handles form submissions

//Set up path for assets
app.use(express.static(__dirname + "/public"))

// Require routes
var routes = require("./routes")

// Require 'request' for http calls
var request = require('request');

// Require ds to read from file
var fs = require('fs');

// Connect to database
var db = require("./config/db")

//Set up Favorite model
var Favorite = require("./models/favorite")(db)
var FavoriteMovie = require("./models/favoriteMovie")(db)


var showtimes;
var details;

app.listen(process.env.PORT || 3000, function(){
  console.log("My Movies server listening at http://localhost:3000/")
})

app.get('/', routes.index)
app.get('/movies', routes.movies)
app.get('/favorite-movies', routes.favoriteMovies)

app.get('/favorite-movies-json', function( req, res ){
  FavoriteMovie.find({}, function (err, favoriteMovies) {
    if (err) console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(favoriteMovies);
  })
})

app.get('/favorites_json', function(req, res){
  Favorite.find({}, function (err, favorites) {
    if (err) console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(favorites);
  })
})

app.post("/reviews", function( req, res){
  var reviewRequestURI = getReviewsRequestURI( req.body.movie )
  console.log("SERVER.JS - ReviewsRequestURI ",reviewRequestURI)
  movies = getReviews( reviewRequestURI, writeToFile )
  res.render("results",{keyword:req.body.keyword})
})

app.post("/details", function( req, res){
  var detailsRequestURI = "http://www.omdbapi.com/?t=" + req.body.title
  console.log("SERVER.HS - detailsRequestURI", detailsRequestURI)
  request(detailsRequestURI, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("SERVER.JS successful AJAX call")
      // var details = JSON.stringify(eval("(" + body + ")"))
      details = body;
      res.render("details",{title:req.body.title, details:details})
    }
    else{
      console.log("Failed AJAX call")
    }
  })
})

app.get('/details/data', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  res.send(details)
})

app.post("/showtimes", function( req, res){
  var requestURI = getShowtimesRequestURI( req.body.zipcode )
  console.log("SERVER.JS - ShowtimesRequestURI ",requestURI)

  request(requestURI, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("SERVER.JS successful AJAX call")
      showtimes = JSON.stringify(eval("(" + body + ")"))
      // showtimes = [ {"title":"The Matrix", "year":"1999"},
      //               {"title":"The Matrix Reloaded","year":"2002"}]
      // showtimes = JSON.stringify(showtimes)
      // console.log("JSON.parse()", JSON.parse(showtimes))
      // showtimes = JSON.parse(showtimes)
      // showtimes = JSON.stringify(showtimes)

      // renderShowtimes(zipcode, showtimes)
      res.render("showtimes",{zipcode:req.body.zipcode, showtimes:showtimes})

    }
    else{
      console.log("Failed AJAX call")
    }
  })
})

// var getShowtimes = function( requestURI, zipcode, renderShowtimes ){
//   request(requestURI, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log("SERVER.JS successful AJAX call")
//       showtimes = JSON.stringify(eval("(" + body + ")"))
//       renderShowtimes(zipcode, showtimes)
//     }
//     else{
//       console.log("Failed AJAX call")
//       return null
//     }
//   })
// }

app.get('/showtimes/data', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  res.send(showtimes)
})

app.post("/favorite-movies", function( req, res){
  console.log("SERVER.JS newFavoriteMovie ", req.body)
  FavoriteMovie.create({myJsonProperty: req.body}),function( err, results ){
    if (err) console.log(err)
  }
  res.render("fave-movies")
})

app.post("/remove", function( req, res){
  console.log("SERVER.JS remove ", req.body)
  FavoriteMovie.remove({_id:req.body._id}, function(err) {
    console.log("err:", err)
  });
  res.redirect("/favorite-movies")
  // FavoriteMovie.find({}, function (err, favoriteMovies) {
  //   if (err) console.log(err);
  //   res.setHeader('Content-Type', 'application/json');
  //   res.json(favoriteMovies);
  // })
})

app.post("/favorites", function( req, res){
  console.log("SERVER.JS new_fave ", req.body)

  Favorite.create({
    display_title:req.body.display_title,
    byline:req.body.byline,
    url:req.body.link.url,
    publication_date:req.body.publication_date
  }, function (err, results) {
    if (err) return handleError(err);
  })

  res.render("results")

})



function writeToFile(data){
  fs.writeFile('movies.json', JSON.stringify(data))
}

function clearFile(){
  fs.writeFile('movieList.json', '')
}

var getShowtimesRequestURI = function( zipcode ){
  var key = "xt6mvwt4htbpv3pjr6hyjtmd"
  var dateObj = new Date()
  var date = dateObj.getDate()
  date =  (date < 10) ? "0"+date : date
  var month = dateObj.getMonth() + 1
  month =  (month < 10) ? "0"+month : month
  var year = dateObj.getFullYear()
  var startDate = year+"-"+month+"-"+date
  requestURI = "http://data.tmsapi.com/v1.1/movies/showings?startDate="+startDate+"&zip="+zipcode+"&api_key="+key
  return requestURI
}

var getReviewsRequestURI = function( keyword ){
  var key = "b1af5705e87f86eccb53e5ed9d84213a:5:72220939"
  var requestURI = "http://api.nytimes.com/svc/movies/v2/reviews/search.json?query="+keyword+"&api-key="+key
  console.log("requestURI", requestURI)
  return requestURI
}



var getReviews = function( requestURI, callback ){
  var results;

  request(requestURI, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("SERVER.JS successful AJAX call")
      results = body
      callback(body)
    }
    else{
      console.log("failure")
    }
  })

  return results
}
