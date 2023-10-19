
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  seriesId: { type: String, required: true },
});

module.exports = mongoose.model('SerieFavorite', favoriteSchema);
