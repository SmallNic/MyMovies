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


    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify(require('fs').readFileSync('./movieList.json')));

    readJSONFile(renderJSONFile)

    // var jsol = require('./jsol')

    function readJSONFile(callback){
      data = require('fs').readFileSync('./movies.json')
      callback(data)

      // var crappyJSON = '{ somePropertyWithoutQuotes: "theValue!"  }';
      // var fixedJSON = data.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
      // var newData = JSON.parse(fixedJSON);

      // var newData = eval('(' + data + ')');

      // $.getScript("jsol.js", function(){
      //   newData = JSOL.parse(data)
      //   callback(newData)
      // });

      // newData = JSOL.parse(data)

    }

    function renderJSONFile( data ){
      // data = JSON.stringify(data)
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }

    /*
    works
    function renderJSONFile( data ){
      // data = JSON.stringify(data)
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }*/

    // var movieList = JSON.parse(data)
    // res.json(movieList)










  },

  results: function(req, res){
    res.render("results")
  }

}
