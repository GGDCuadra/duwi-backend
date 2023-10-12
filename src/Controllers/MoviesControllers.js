const { MongoClient, ObjectID } = require('mongodb');

const mongoURL = 'mongodb+srv://DBUSER:PF123@cluster0.x6eafwv.mongodb.net/DB_PF';
const dbName = 'DB_PF';
const collectionName = 'Movies';

const getMovies = async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const movies = await collection.find({}).toArray();
    client.close();
    res.json(movies);


    
  } catch (err) {
    console.error('Error al obtener datos de la base de datos:', err);
    res.status(500).send('Error interno del servidor');
  }
};


module.exports = { getMovies};
