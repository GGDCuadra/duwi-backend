const mongoose = require('mongoose');

const movieFavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  moviesId: { type: String, required: true },
  name: {type: String, required: true },
  genres: { type: String, required: true },
  image: { type: String, required: true}
});

const MoviesFavorite = mongoose.model('MoviesFavorite', movieFavoriteSchema);

 module.exports = MoviesFavorite