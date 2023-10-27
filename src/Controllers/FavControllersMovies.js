const MovieFavorite = require('../Models/FavoritesModelMovies');

const addMovieToFavorite = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const movieFavorite = new MovieFavorite({ userId, movieId });
    await movieFavorite.save();
    res.status(201).json(movieFavorite);
  } catch (error) {
    console.log("Error al crear la película", error);
    res.status(500).json({ error: 'No se pudo agregar la película a favoritos.' });
  }
};


//TRAIGO MIS MOVIES FAVORITAS
const getFavoriteMoviesByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
      // Consulta la base de datos para encontrar las películas favoritas del usuario
      const favoriteMovies = await MovieFavorite.find({ userId });

      res.status(200).json(favoriteMovies);
    } catch (error) {
      res.status(500).json({ error: 'No se pudieron obtener las películas favoritas.' });
    }
  };


//ELIMINAR MOVIE DE FAVORITOS
  const deleteMovieFromFavorite = async (req, res) => {
    try {
      const { userId, movieId } = req.params;

      // Busca el registro en la base de datos que asocie el usuario y la película como favorita
      const movieFavorite = await MovieFavorite.findOneAndDelete({ userId, movieId });

      if (!movieFavorite) {
        return res.status(404).json({ error: 'Película no encontrada en favoritos.' });
      }

      res.status(200).json({ message: 'Película eliminada de favoritos.' });
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar la película de favoritos.' });
    }
  };

module.exports = { addMovieToFavorite, getFavoriteMoviesByUser, deleteMovieFromFavorite };
