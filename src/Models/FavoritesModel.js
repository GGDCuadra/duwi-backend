const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  seriesId: { type: String, required: true},
  name: { type: String, required: true },
  genres: { type: String, required: true },
  image: {type: String, required: true}
});

const SeriesFavorite = mongoose.model('SeriesFavorite', favoriteSchema);

module.exports = SeriesFavorite