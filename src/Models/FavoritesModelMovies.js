const mongoose = require('mongoose');

const movieFavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
});

module.exports = mongoose.model('MovieFavorite', movieFavoriteSchema);