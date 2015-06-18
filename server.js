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
  var requestURI = getRequestURI( req.body.keyword )
  console.log("SERVER.JS requestURI ",requestURI)
  // var movies = null;
  movies = getResults( requestURI, writeToFile )

  // var movies = fs.readFileSync('./movieList.json')

  // console.log("SERVER.JS movies:", movies)
  // res.render("results", {movies:movies})
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
  // var movies = fs.readFileSync('movies.json');
  // return movies
  var results;

  request(requestURI, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("SERVER.JS successful AJAX call", body)
      results = body
      callback(body)
    }
    else{
      console.log("failure")
    }
  })

  return results
}
