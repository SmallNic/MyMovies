module.exports = function( db ){
  var favoriteMovieSchema = new db.Schema({
    title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    myJsonProperty: Object
  })
  return db.model('FavoriteMovie', favoriteMovieSchema)
}
