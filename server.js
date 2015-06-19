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

app.listen(process.env.PORT || 3000, function(){
  console.log("My Movies server listening at http://localhost:3000/")
})

app.get('/', routes.index)
app.get('/movies', routes.movies)

app.get('/favorites_json', function(req, res){
  Favorite.find({}, function (err, favorites) {
    if (err) console.log(err);
    res.setHeader('Content-Type', 'application/json');
    res.send(favorites);
  })
})

app.post("/", function( req, res){
  var requestURI = getRequestURI( req.body.keyword )
  console.log("SERVER.JS requestURI ",requestURI)
  movies = getResults( requestURI, writeToFile )
  res.render("results",{keyword:req.body.keyword})
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

// var getRequestURI = function( zipcode ){
//   var key = "xt6mvwt4htbpv3pjr6hyjtmd"
//   var dateObj = new Date()
//   var date = dateObj.getDate()
//   date =  (date < 10) ? "0"+date : date
//   var month = dateObj.getMonth() + 1
//   month =  (month < 10) ? "0"+month : month
//   var year = dateObj.getFullYear()
//   var startDate = year+"-"+month+"-"+date
//   requestURI = "http://data.tmsapi.com/v1.1/movies/showings?startDate="+startDate+"&zip="+zipcode+"&api_key="+key
//   return requestURI
// }

var getRequestURI = function( keyword ){
  var key = "b1af5705e87f86eccb53e5ed9d84213a:5:72220939"
  var requestURI = "http://api.nytimes.com/svc/movies/v2/reviews/search.json?query="+keyword+"&api-key="+key
  console.log("requestURI", requestURI)
  return requestURI
}

var getResults = function( requestURI, callback ){
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
