const { MongoClient, ObjectId } = require('mongodb');

const mongoURL = 'mongodb+srv://DBUSER:PF123@cluster0.x6eafwv.mongodb.net/DB_PF';
const dbName = 'DB_PF';

const postMovieVista = async (req, res) => {
  const { body } = req;
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Moviesvistas'); // Nombre de la colección: Moviesvistas

    const movieVista = {
      userId: body.userId, 
      movieId: body.movieId, 
      completada: body.completada
    };

    await collection.insertOne(movieVista);
    res.status(201).json({ message: 'Película vista creada exitosamente' });

    client.close();
  } catch (err) {
    console.error('Error al crear la película vista:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const postSerieVista = async (req, res) => {
  const { body } = req;
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Seriesvistas'); // Nombre de la colección: Seriesvistas

    const serieVista = {
      userId: body.userId,
      serieId: body.serieId,
      completada: body.completada
    };

    await collection.insertOne(serieVista);
    res.status(201).json({ message: 'Serie vista creada exitosamente' });

    client.close();
  } catch (err) {
    console.error('Error al crear la serie vista:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const getMoviesVistasById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Moviesvistas'); // Nombre de la colección: Moviesvistas

    const movieVistas = await collection.find({ userId: id }).toArray();

    client.close();

    res.json(movieVistas);
  } catch (err) {
    console.error('Error al obtener las películas vistas por ID:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const getSeriesVistasById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Seriesvistas'); // Nombre de la colección: Seriesvistas

    const serieVistas = await collection.find({ userId: id }).toArray();

    client.close();

    res.json(serieVistas);
  } catch (err) {
    console.error('Error al obtener las series vistas por ID:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const putMovieVista = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Moviesvistas');

    const existingMovieVista = await collection.findOne({ _id: new ObjectId(id) });

    if (!existingMovieVista) {
      res.status(404).json({ error: 'Película vista no encontrada' });
      return;
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { completada: body.completada } });

    res.status(200).json({ message: 'Película vista actualizada exitosamente' });

    client.close();
  } catch (err) {
    console.error('Error al actualizar la película vista:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const putSerieVista = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Seriesvistas');

    const existingSerieVista = await collection.findOne({ _id: new ObjectId(id) });

    if (!existingSerieVista) {
      res.status(404).json({ error: 'Serie vista no encontrada' });
      return;
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { completada: body.completada } });

    res.status(200).json({ message: 'Serie vista actualizada exitosamente' });

    client.close();
  } catch (err) {
    console.error('Error al actualizar la serie vista:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const deleteMovieVista = async (req, res) => {
  const { params } = req;
  const { id } = params;

  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Moviesvistas');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Película vista no encontrada' });
      return;
    }

    res.status(200).json({ message: 'Película vista eliminada exitosamente' });

    client.close();
  } catch (err) {
    console.error('Error al eliminar la película vista:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const deleteSerieVista = async (req, res) => {
  const { params } = req;
  const { id } = params;

  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('Seriesvistas');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Serie vista no encontrada' });
      return;
    }

    res.status(200).json({ message: 'Serie vista eliminada exitosamente' });

    client.close();
  } catch (err) {
    console.error('Error al eliminar la serie vista:', err);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  postMovieVista,
  postSerieVista,
  getMoviesVistasById,
  getSeriesVistasById,
  putMovieVista,
  putSerieVista,
  deleteMovieVista,
  deleteSerieVista
};