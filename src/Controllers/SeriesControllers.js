const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb+srv://DBUSER:PF123@cluster0.x6eafwv.mongodb.net/DB_PF';
const dbName = 'DB_PF';

const getSeries = async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection('SERIES');
    const series = await collection.find({}).toArray();
    client.close();
    res.json(series);


    
  } catch (err) {
    console.error('Error al obtener datos de la colección "SERIES":', err);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = { getSeries };
