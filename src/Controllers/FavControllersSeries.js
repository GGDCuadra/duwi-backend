const SeriesFavorite = require('../Models/FavoritesModel'); 

const addFavSeries = async (req, res) => {
  try {
    console.log("Solicitud recibida");
    const { userId, seriesId, name, genres, image } = req.body;
    console.log(name, userId, seriesId, genres, image);
    const favorite = new SeriesFavorite({ userId, seriesId, name, genres, image });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el favorito.' });
  }
};

//TRAER MIS FAVORITOS 
const getFavoritesByUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Consulta la base de datos para encontrar los favoritos del usuario
      const favorites = await SeriesFavorite.find({ userId });
  
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ error: 'No se pudieron obtener los favoritos.' });
    }
  };
  

  //-----ELIMINAR DE MIS FAVORITOS 
  const deleteFavorite = async (req, res) => {
    const { userId, seriesId, name, genre, image } = req.params;
  
    try {
    
      const favorite = await SeriesFavorite.findOneAndDelete({ userId, seriesId, name, genre, image });
  
      if (!favorite) {
        return res.status(404).json({ error: 'Serie no encontrada en favoritos.' });
      }
  
     
    //   await favorite.remove();
    //   console.log(favorite);
      res.status(200).json({ message: 'Serie eliminada de favoritos.' });
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar la serie de favoritos.' });
    }
  };

module.exports = {addFavSeries, getFavoritesByUser, deleteFavorite};