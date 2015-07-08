module.exports ={

  index: function( req, res ){
    res.render("index")
  },

  favoriteMovies: function( req, res ){
    res.render("fave-movies")
  }

}
