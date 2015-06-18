module.exports ={

  index: function(req, res){
    res.render("index")
  },

  movies: function(req, res){
    // var movieList = req.query.movieList
    // console.log(movieList)
    // res.render("results", {movieList:movieList})
    // var fs = ;
    // people = [{name:"nic", age:32}, {name:"teddy", age:10}, {name:"zoey", age:9}]

    // var data = fs.readFile('./movies.json')
    // res.setHeader('Content-Type', 'application/json');
    // res.send(data);

    readJSONFile(renderJSONFile)

    function readJSONFile(callback){
      data = require('fs').readFileSync('./movieList.json')
      data = JSON.stringify(data)
      callback(data)
    }

    function renderJSONFile( data ){
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }


    // var movieList = JSON.parse(data)
    // res.json(movieList)

  },

  results: function(req, res){
    res.render("results")
  }

}
