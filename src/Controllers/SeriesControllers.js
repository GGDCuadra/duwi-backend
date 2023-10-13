const { ObjectId, MongoClient } = require('mongodb');
const Series = require('../Models/SeriesModel');

const mongoURL = 'mongodb+srv://DBUSER:PF123@cluster0.x6eafwv.mongodb.net/DB_PF';
const dbName = 'DB_PF';
const collectionName='SERIES';

const loadSeriesFromDatabase = async () => {
  const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const series = await collection.find({}).toArray();
  client.close();
  return series;
}

const getSeries = async (req, res) => {
  try {
    const series = await loadSeriesFromDatabase();
    
    const mappedSeries = series.map(serie => {
      return{
        _id: serie._id,
        url: serie.url,
        name: serie.name,
        type: serie.type,
        language: serie.language,
        genres: serie.genres.map(genre => genre), 
        status: serie.status,
        runtime: serie.runtime,
        premiered: serie.premiered,
        officialSite: serie.officialSite,
        schedule: serie.schedule,
        rating: serie.rating,
        weight: serie.weight,
        network: serie.network,
        country: serie.country,
        webChannel: serie.webChannel,
        externals: serie.externals,
        image: serie.image,
        summary: serie.summary,
        updated: serie.updated,
        _links: serie._links,
        self: serie._links.self.href, 
        previousepisode: serie._links.previousepisode.href, 
        deshabilitar: serie.deshabilitar
      };
    });
    const seriesHabilitadas = mappedSeries.filter(serie => serie.deshabilitar !== 'deshabilitada');

    res.json(seriesHabilitadas);
  } catch (err) {
    console.error('Error al obtener datos de la colección "SERIES":', err);
    res.status(500).send('Error interno del servidor');
  }
};

//--TOP
const getTopSeries = async (req,res) => {
  try{
    const series = await loadSeriesFromDatabase();
  
    const topSeries = series.slice(0, 10);
    const mappedSeries = topSeries.map(serie =>{
      return{
        _id: serie._id,
        url: serie.url,
        name: serie.name,
        type: serie.type,
        language: serie.language,
        genres: serie.genres.map(genre => genre), 
        status: serie.status,
        runtime: serie.runtime,
        premiered: serie.premiered,
        officialSite: serie.officialSite,
        schedule: serie.schedule,
        rating: serie.rating,
        weight: serie.weight,
        network: serie.network,
        country: serie.country,
        webChannel: serie.webChannel,
        externals: serie.externals,
        image: serie.image,
        summary: serie.summary,
        updated: serie.updated,
        _links: serie._links,
        self: serie._links.self.href, 
        previousepisode: serie._links.previousepisode.href, 
        deshabilitar: serie.deshabilitar
      };
    });
    res.json(mappedSeries);
  }catch(err){
    console.error('Error al obtener las 10 series principales:', err);
    res.status(500).send('Error interno del servidor');
  }
};

//---ID
const getSeriesById = async (req, res) => {
  const seriesId = req.params.id;
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
  
    const serie = await collection.findOne({ _id: new ObjectId(seriesId) });

    if (!serie) {
      res.status(404).json({ error: 'Serie no encontrada' });
    } else {
      res.json(serie);
    }
    
    client.close();
  } catch (err) {
    console.error('Error al obtener la serie por ID:', err);
    res.status(500).send('Error interno del servidor');
  }
};

//---Name
const getSeriesByName = async (req, res) => {
  const { name } = req.params;
  try {
    const series = await loadSeriesFromDatabase();
    const serie = series.find(serie => serie.name === name );
    if (!serie) {
      res.status(404).json({ error: 'Serie no encontrada' });
    } else {
      res.json(serie);
    }
  } catch (err) {
    console.error('Error al obtener la serie por título:', err);
    res.status(500).send('Error interno del servidor');
  }
};

//----Disable
const disableSerie = async (req, res) => {
  try {
    const serieId = req.params.id;
    const series = await loadSeriesFromDatabase();
    const serie = series.find(serie => serie._id.toString() === serieId);

    if (!serie) {
      res.status(404).json({ error: 'Serie no encontrada' });
      return;
    }

    serie.deshabilitar = 'Disabled';

    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.updateOne({ _id: new ObjectId(serieId) }, { $set: { deshabilitar: 'Disabled' } });

    res.json(serie);
    client.close();
  } catch (err) {
    console.error('Error al deshabilitar la serie:', err);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = { getSeries, getSeriesById, getSeriesByName, getTopSeries, disableSerie };