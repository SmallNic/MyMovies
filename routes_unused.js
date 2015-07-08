module.exports ={

  index: function( req, res ){
    res.render("index")
  },

  favoriteMovies: function( req, res ){
    res.render("fave-movies")
  },

  movies: function(req, res){
    readJSONFile(renderJSONFile)

    function readJSONFile(callback){
      data = require('fs').readFileSync('./movies.json')
      callback(data)
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
  },

  results: function(req, res){
    res.render("results")
  }

}
