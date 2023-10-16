const { MongoClient ,ObjectId } = require('mongodb');
const Movie = require('../Models/MoviesModel'); 

const mongoURL = 'mongodb+srv://DBUSER:PF123@cluster0.x6eafwv.mongodb.net/DB_PF';
const dbName = 'DB_PF';
const collectionName = 'Movies';

const loadMoviesFromDatabase = async () => {
  const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const movies = await collection.find({}).toArray();
  client.close();
  return movies;
};

const getMovies = async (req, res) => {
  try {
    const movies = await loadMoviesFromDatabase();

    const enabledMovies = movies.filter(movie => movie.deshabilitar !== 'Disabled');

    const mappedMovies = enabledMovies.map(movie => {
      return {
        _id: movie._id,
        id: movie.id,
        Poster_Link: movie.Poster_Link,
        Series_Title: movie.Series_Title,
        Released_Year: movie.Released_Year,
        Certificate: movie.Certificate,
        Runtime: movie.Runtime,
        Genre: movie.Genre,
        IMDB_Rating: movie.IMDB_Rating,
        Overview: movie.Overview,
        Meta_score: movie.Meta_score,
        Director: movie.Director,
        Star1: movie.Star1,
        Star2: movie.Star2,
        Star3: movie.Star3,
        Star4: movie.Star4,
        No_of_Votes: movie.No_of_Votes,
        Gross: movie.Gross,
        deshabilitar: movie.deshabilitar
      };
    });

    res.json(mappedMovies);
  } catch (err) {
    console.error('Error al obtener datos de la base de datos:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const getTopMovies = async (req, res) => {
  try {
    const movies = await loadMoviesFromDatabase();

    
    const topMovies = movies.slice(0, 10);

    const mappedMovies = topMovies.map(movie => {
      return {
        _id: movie._id,
        id: movie.id,
        Poster_Link: movie.Poster_Link,
        Series_Title: movie.Series_Title,
        Released_Year: movie.Released_Year,
        Certificate: movie.Certificate,
        Runtime: movie.Runtime,
        Genre: movie.Genre,
        IMDB_Rating: movie.IMDB_Rating,
        Overview: movie.Overview,
        Meta_score: movie.Meta_score,
        Director: movie.Director,
        Star1: movie.Star1,
        Star2: movie.Star2,
        Star3: movie.Star3,
        Star4: movie.Star4,
        No_of_Votes: movie.No_of_Votes,
        Gross: movie.Gross,
        deshabilitar: movie.deshabilitar
      };
    });

    res.json(mappedMovies);
  } catch (err) {
    console.error('Error al obtener las 10 películas principales:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const getMoviesByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const movies = await loadMoviesFromDatabase();

    const filteredMovies = movies.filter(movie => movie.Genre.includes(genre));

    if (filteredMovies.length === 0) {
      res.status(404).json({ error: 'No se encontraron películas para este género' });
    } else {
      const mappedMovies = filteredMovies.map(movie => {
        return {
          _id: movie._id,
          id: movie.id,
          Poster_Link: movie.Poster_Link,
          Series_Title: movie.Series_Title,
          Released_Year: movie.Released_Year,
          Certificate: movie.Certificate,
          Runtime: movie.Runtime,
          Genre: movie.Genre,
          IMDB_Rating: movie.IMDB_Rating,
          Overview: movie.Overview,
          Meta_score: movie.Meta_score,
          Director: movie.Director,
          Star1: movie.Star1,
          Star2: movie.Star2,
          Star3: movie.Star3,
          Star4: movie.Star4,
          No_of_Votes: movie.No_of_Votes,
          Gross: movie.Gross,
          deshabilitar: movie.deshabilitar
        };
      });

      res.json(mappedMovies);
    }
  } catch (err) {
    console.error('Error al obtener películas por género:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movies = await loadMoviesFromDatabase();
    const movie = movies.find(movie => movie.id === parseInt(id, 10));
    if (!movie) {
      res.status(404).json({ error: 'Película no encontrada' });
    } else {
      res.json(movie);
    }
  } catch (err) {
    console.error('Error al obtener la película por ID:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const getMovieByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const movies = await loadMoviesFromDatabase();
    const movie = movies.find(movie => movie.Series_Title === title);
    if (!movie) {
      res.status(404).json({ error: 'Película no encontrada' });
    } else {
      res.json(movie);
    }
  } catch (err) {
    console.error('Error al obtener la película por título:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const postMovie = async (req, res) => {
  const { body } = req;
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const movie = {
      id: body.id,
      Poster_Link: body.Poster_Link,
      Series_Title: body.Series_Title,
      Released_Year: body.Released_Year,
      Certificate: body.Certificate,
      Runtime: body.Runtime,
      Genre: body.Genre,
      IMDB_Rating: body.IMDB_Rating,
      Overview: body.Overview,
      Meta_score: body.Meta_score,
      Director: body.Director,
      Star1: body.Star1,
      Star2: body.Star2,
      Star3: body.Star3,
      Star4: body.Star4,
      No_of_Votes: body.No_of_Votes,
      Gross: body.Gross,
      deshabilitar: body.deshabilitar,
    };

    await collection.insertOne(movie);
    res.status(201).json({ message: 'Película creada exitosamente' });

    client.close();
  } catch (err) {
    console.error('Error al crear la película:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const putMovie = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Buscar la película actual en la base de datos por _id
    const existingMovie = await collection.findOne({ _id: new ObjectId(id) });

    if (!existingMovie) {
      res.status(404).json({ error: 'Película no encontrada' });
      return;
    }

    // Actualizar los campos con los nuevos valores
    const updatedMovie = {
      id: existingMovie.id,
      Poster_Link: body.Poster_Link || existingMovie.Poster_Link,
      Series_Title: body.Series_Title || existingMovie.Series_Title,
      Released_Year: body.Released_Year || existingMovie.Released_Year,
      Certificate: body.Certificate || existingMovie.Certificate,
      Runtime: body.Runtime || existingMovie.Runtime,
      Genre: body.Genre || existingMovie.Genre,
      IMDB_Rating: body.IMDB_Rating || existingMovie.IMDB_Rating,
      Overview: body.Overview || existingMovie.Overview,
      Meta_score: body.Meta_score || existingMovie.Meta_score,
      Director: body.Director || existingMovie.Director,
      Star1: body.Star1 || existingMovie.Star1,
      Star2: body.Star2 || existingMovie.Star2,
      Star3: body.Star3 || existingMovie.Star3,
      Star4: body.Star4 || existingMovie.Star4,
      No_of_Votes: body.No_of_Votes || existingMovie.No_of_Votes,
      Gross: body.Gross || existingMovie.Gross,
      deshabilitar: body.deshabilitar || existingMovie.deshabilitar,
    };

    // Actualizar la película en la base de datos por _id
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedMovie });

    res.status(200).json({ message: 'Película actualizada exitosamente', updatedMovie });

    client.close();
  } catch (err) {
    console.error('Error al actualizar la película:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const getEnabledMovies = async (req, res) => {
  try {
    const movies = await loadMoviesFromDatabase();

    // Filtrar películas con "deshabilitar" establecido en "null"
    const enabledMovies = movies.filter(movie => movie.deshabilitar === 'null');

    const mappedMovies = enabledMovies.map(movie => {
      return {
        _id: movie._id,
        id: movie.id,
        Poster_Link: movie.Poster_Link,
        Series_Title: movie.Series_Title,
        Released_Year: movie.Released_Year,
        Certificate: movie.Certificate,
        Runtime: movie.Runtime,
        Genre: movie.Genre,
        IMDB_Rating: movie.IMDB_Rating,
        Overview: movie.Overview,
        Meta_score: movie.Meta_score,
        Director: movie.Director,
        Star1: movie.Star1,
        Star2: movie.Star2,
        Star3: movie.Star3,
        Star4: movie.Star4,
        No_of_Votes: movie.No_of_Votes,
        Gross: movie.Gross,
        deshabilitar: movie.deshabilitar
      };
    });

    res.json(mappedMovies);
  } catch (err) {
    console.error('Error al obtener películas habilitadas:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const getDisableMovies = async (req, res) => {
  try {
    const movies = await loadMoviesFromDatabase();

    // Filtrar películas con "deshabilitar" diferente de "null"
    const disableMovies = movies.filter(movie => movie.deshabilitar !== 'null');

    const mappedMovies = disableMovies.map(movie => {
      return {
        _id: movie._id,
        id: movie.id,
        Poster_Link: movie.Poster_Link,
        Series_Title: movie.Series_Title,
        Released_Year: movie.Released_Year,
        Certificate: movie.Certificate,
        Runtime: movie.Runtime,
        Genre: movie.Genre,
        IMDB_Rating: movie.IMDB_Rating,
        Overview: movie.Overview,
        Meta_score: movie.Meta_score,
        Director: movie.Director,
        Star1: movie.Star1,
        Star2: movie.Star2,
        Star3: movie.Star3,
        Star4: movie.Star4,
        No_of_Votes: movie.No_of_Votes,
        Gross: movie.Gross,
        deshabilitar: movie.deshabilitar
      };
    });

    res.json(mappedMovies);
  } catch (err) {
    console.error('Error al obtener películas deshabilitadas:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const getMovieByObjectId = async (req, res) => {
  const movieId = req.params.id;
  
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
  
    const movie = await collection.findOne({ _id: new ObjectId(movieId) });

    if (!movie) {
      res.status(404).json({ error: 'Película no encontrada' });
    } else {
      res.json(movie);
    }
    
    client.close();
  } catch (err) {
    console.error('Error al obtener la película por _id:', err);
    res.status(500).send('Error interno del servidor');
  }
};


module.exports = {  getMovieByObjectId, getDisableMovies, postMovie, getMovies, getMovieById, getMovieByTitle, getTopMovies,getMoviesByGenre ,putMovie ,getEnabledMovies};