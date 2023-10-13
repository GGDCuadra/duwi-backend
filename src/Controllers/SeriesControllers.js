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
    res.json(mappedSeries);
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
  const { name } = req.query;
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

const postSeries = async (req, res) => {
  const { body } = req;
  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const serie = {
      id: body.id,
      url: body.url,
      name: body.name,
      type: body.type,
      language: body.language,
      genres: body.genres.map((genre) => genre),
      status: body.status,
      runtime: body.runtime,
      premiered: body.premiered,
      officialSite: body.officialSite,
      schedule: body.schedule,
      rating: body.rating,
      weight: body.weight,
      network: body.network,
      country: body.country,
      webChannel: body.webChannel,
      externals: body.externals,
      image: body.image,
      summary: body.summary,
      updated: body.updated,
      _links: body._links,
      self: body._links.self.href,
      previousepisode: body._links.previousepisode.href,
      deshabilitar: body.deshabilitar,
    };

    await collection.insertOne(serie);
    res.status(201).json({ message: 'Serie creada exitosamente' });

    client.close();
  } catch (err) {
    console.error('Error al crear la serie:', err);
    res.status(500).send('Error interno del servidor');
  }
};
    
module.exports = { getSeries, getSeriesById, getSeriesByName, getTopSeries, postSeries };