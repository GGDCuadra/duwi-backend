const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: Number,
  Poster_Link: String,
  Series_Title: String,
  Released_Year: Number,
  Certificate: String,
  Runtime: String,
  Genre: String,
  IMDB_Rating: Number,
  Overview: String,
  Meta_score: Number,
  Director: String,
  Star1: String,
  Star2: String,
  Star3: String,
  Star4: String,
  No_of_Votes: Number,
  Gross: String,
  deshabilitar: String,
}, { collection: 'Movies' });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
