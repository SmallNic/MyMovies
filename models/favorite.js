module.exports = function( db ){
  var favoriteSchema = new db.Schema({
      display_title: String,
      byline: String,
      url: String,
      publication_date: String
  })
  return db.model('Favorite', favoriteSchema)
}
