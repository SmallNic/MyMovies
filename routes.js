module.exports ={

  index: function(req, res){
    res.render("index")
  },

  movies: function(req, res){
    // var movieList = req.query.movieList
    // console.log(movieList)
    // res.render("results", {movieList:movieList})
    var fs = require('fs');
    // var movieList = fs.readFileSync('./movies.json');
    // res.json(movieList);
    people = [{name:"nic", age:32}, {name:"teddy", age:10}, {name:"zoey", age:9}]

    var movieList;
    fs.readFile('./movies.json', 'utf8', function (err, data) {
      if (err) throw err;
      // movieList = JSON.parse(data);
    });

    res.json(people)

  },

  results: function(req, res){
    res.render("results")
  }

}
