const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const router = express.Router();
const dbURL = process.env.DB_URL; 

router.get('/series', async (req, res) => {
  
  try {
    const client = new MongoClient(dbURL, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db();
    const seriesCollection = db.collection('Serie'); 
    const series = await seriesCollection.find({}).toArray();
    res.json(series);
    client.close();




  } catch (error) {
    console.error('Error al conectar o consultar la base de datos:', error);
    res.status(500).send('Error al consultar la base de datos');
  }
});

module.exports = router;
