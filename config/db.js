var mongoose = require("mongoose")
var options = { server:  { socketOptions: { keepAlive: 1, connectTimeoutMS:30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS:30000 } } }
// var mongodbUri = "mongodb://heroku_72m50ng8:n8k6pirojqr2adajhl6ij9kgu9@ds045632.mongolab.com:45632/heroku_72m50ng8"

var mongodbUri = "mongodb://admin:admin@ds047692.mongolab.com:47692/heroku_m2gr5q80"
mongoose.connect(mongodbUri, options)  //For deployment to Heroku - to be uncommented out later
// mongoose.connect("mongodb://localhost/my_movies")
module.exports = mongoose
