const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb+srv://DBUSER:PF123@cluster0.x6eafwv.mongodb.net/DB_PF';
const dbName = 'DB_PF';

const postMovieRating = async (req, res) => {
  const { body } = req;
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('MovieRatings'); 

    const existingRating = await collection.findOne({ userId: body.userId, movieId: body.movieId });

    if (existingRating) {
      return res.json({message:"Ya ha calificado esta película"});
    }

    const rating = parseInt(body.puntuacion);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).send("La puntuación debe ser un número entre 1 y 5");
    }
    const movieRating = {
      userId: body.userId,
      movieId: body.movieId,
      puntuacion: rating, 
    };
    await collection.insertOne(movieRating);
    res.status(201).json({ message: 'Puntuación de película creada exitosamente' });

    client.close();
  } catch (err) {
    console.error('Error al crear la puntuación de película:', err);
    res.status(500).send('Error interno del servidor');
  }
};


const postSeriesRating = async (req, res) => {
    const { body } = req;
    try {
      const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
      const db = client.db(dbName);
      const collection = db.collection('SeriesRatings');
  
      const existingRating = await collection.findOne({ userId: body.userId, serieId: body.serieId });
  
      if (existingRating) {
        return res.json({message:"Ya ha calificado esta serie"});
      }
      const rating = parseInt(body.puntuacion);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        return res.status(400).send("La puntuación debe ser un número entre 1 y 5");
      }
      const seriesRating = {
        userId: body.userId,
        serieId: body.serieId,
        puntuacion: rating, 
      };
  
      await collection.insertOne(seriesRating);
      res.status(201).json({ message: 'Puntuación de serie creada exitosamente' });
  
      client.close();
    } catch (err) {
      console.error('Error al crear la puntuación de serie:', err);
      res.status(500).send('Error interno del servidor');
    }
  };
  
 
  const getAverageMovieRating = async (req, res) => {
    const { params } = req;
    const { movieId } = params;
  
    try {
      const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
      const db = client.db(dbName);
      const collection = db.collection('MovieRatings');
  
      const movieRatings = await collection.find({ movieId }).toArray();
  
      if (movieRatings.length === 0) {
        return res.status(404).send("No hay calificaciones para esta película.");
      }
  
      const totalRatings = movieRatings.length;
      const totalRatingValue = movieRatings.reduce((sum, rating) => sum + rating.puntuacion, 0);
      const averageRating = totalRatingValue / totalRatings;
  
      // Redondear el promedio a un número entero
      const roundedAverageRating = Math.round(averageRating);
  
      res.status(200).json({ averageRating: roundedAverageRating });
      client.close();
    } catch (err) {
      console.error('Error al obtener la calificación promedio de la película:', err);
      res.status(500).send('Error interno del servidor');
    }
  };
  
  const getAverageSeriesRating = async (req, res) => {
    const { params } = req;
    const { serieId } = params;
  
    try {
      const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
      const db = client.db(dbName);
      const collection = db.collection('SeriesRatings');
  
      const seriesRatings = await collection.find({ serieId }).toArray();
  
      if (seriesRatings.length === 0) {
        return res.status(404).send("No hay calificaciones para esta serie.");
      }
      const totalRatings = seriesRatings.length;
      const totalRatingValue = seriesRatings.reduce((sum, rating) => sum + rating.puntuacion, 0);
      const averageRating = totalRatingValue / totalRatings;
  
      const roundedAverageRating = Math.round(averageRating);
  
      res.status(200).json({ averageRating: roundedAverageRating });
      client.close();
    } catch (err) {
      console.error('Error al obtener la calificación promedio de la serie:', err);
      res.status(500).send('Error interno del servidor');
    }
  };
  
  module.exports = {
    postMovieRating,
    postSeriesRating,
    getAverageMovieRating,
    getAverageSeriesRating, 
  };