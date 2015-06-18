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

app.listen(process.env.PORT || 3000, function(){
  console.log("My Movies server listening at http://localhost:3000/")
})

app.get('/', routes.index)
app.get('/movies', routes.movies)

app.post("/", function( req, res){
  var requestURI = getRequestURI( req.body.zipcode )
  console.log("requestURI ",requestURI)
  var movies = null;
  movies = getMovieList( requestURI, writeToFile )
  console.log("movies:", movies)
  res.render("results", {movies:movies})
})



function writeToFile(data){
  fs.writeFile('movieList.json', JSON.stringify(data))
}

var getRequestURI = function( zipcode ){
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


var getMovieList = function( requestURI, callback ){
  // var movies = fs.readFileSync('movies.json');
  // return movies

  request(requestURI, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("successful AJAX call")
      callback(body)
    }
    else{
      console.log("failure")
    }
  })
}
