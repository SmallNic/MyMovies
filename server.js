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
