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
    const{genre, page, perPage, sortByTitle, sortByYear} = req.query

    let series = await loadSeriesFromDatabase();

    if(genre){
      series = series.filter((serie) => serie.genres.includes(genre))
    }

    if (sortByTitle === 'asc') {

      series.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortByTitle === 'desc') {
      series.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sortByYear === 'asc') {
      // Ordenar por año ascendente
      series.sort((a, b) => {
        const yearA = new Date(a.premiered).getFullYear();
        const yearB = new Date(b.premiered).getFullYear();
        return yearA - yearB;
      });
    } else if (sortByYear === 'desc') {
      // Ordenar por año descendente
      series.sort((a, b) => {
        const yearA = new Date(a.premiered).getFullYear();
        const yearB = new Date(b.premiered).getFullYear();
        return yearB - yearA;
      });
    }


    if (page && perPage) {
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + parseInt(perPage, 10);
      series = series.slice(startIndex, endIndex);
    }

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
        deshabilitar: serie.deshabilitar,
        Trailer: serie.Trailer
      };
    });
    const seriesHabilitadas = mappedSeries.filter(serie => serie.deshabilitar !== 'Disabled');

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

// POSTSERIES
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

//UPDATE
const updateSeries = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existingSeries = await collection.findOne({ id: parseInt(id, 10) });

    if (!existingSeries) {
      res.status(404).json({ error: 'Serie no encontrada' });
      return;
    }

    const updatedSeries = {
      id: existingSeries.id,
      name: body.name,
      type: body.type ,
      language: body.language || existingSeries.language,
      // Agrega aquí otros campos de actualización según tu esquema de datos
    };

    await collection.updateOne({ id: parseInt(id, 10) }, { $set: updatedSeries });
    res.status(200).json({ message: 'Serie actualizada exitosamente', updatedSeries });

    client.close();
  } catch (err) {
    console.error('Error al actualizar la serie:', err);
    res.status(500).send('Error interno del servidor');
  }
}

const getAllSeries = async (req, res) => {
  try {
    const { genre, page, perPage, sortByTitle, sortByYear } = req.query;
    const series = await loadSeriesFromDatabase();

    if (genre) {
      series = series.filter(serie => serie.Genre.includes(genre));
    }

    if (sortByTitle === 'asc') {
      // Ordenar alfabéticamente por título ascendente
      series.sort((a, b) => a.Series_Title.localeCompare(b.Series_Title));
    } else if (sortByTitle === 'desc') {
      // Ordenar alfabéticamente por título descendente
      series.sort((a, b) => b.Series_Title.localeCompare(a.Series_Title));
    }

    if (sortByYear === 'asc') {
      // Ordenar por año ascendente
      series.sort((a, b) => a.Released_Year - b.Released_Year);
    } else if (sortByYear === 'desc') {
      // Ordenar por año descendente
      series.sort((a, b) => b.Released_Year - a.Released_Year);
    }

    if (page && perPage) {
      const startIndex = (perPage * page) - perPage;
      const endIndex = startIndex + parseInt(perPage, 10);
      series = series.slice(startIndex, endIndex);
    }

    const mappedSeries = series.map(serie => {
      return {
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
        deshabilitar: serie.deshabilitar,
        Trailer: serie.Trailer
      };
    });

    res.json(mappedSeries);
  } catch (err) {
    console.error('Error al obtener series:', err);
    res.status(500).send('Error interno del servidor');
  }
};



 //----Disable
 const enableSerie = async (req, res) => {
  const { serieId } = req.params;

  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const serie = await collection.findOne({ _id: new ObjectId(serieId) });

    if (!serie) {
      res.status(404).json({ error: 'Serie no encontrada' });
      return;
    }

    await collection.updateOne({ _id: new ObjectId(serieId) }, { $set: { deshabilitar: null } });
    const updatedSerie = await collection.findOne({ _id: new ObjectId(serieId) });
    res.status(200).json({ message: 'Serie habilitada exitosamente', updatedSerie });
    client.close();
    
  } catch (err) {
    console.error('Error al habilitar la serie:', err);
    res.status(500).send('Error interno del servidor');
  }
};

const disableSerie = async (req, res) => {
  const { serieId } = req.params;

  try {
    const client = await MongoClient.connect(mongoURL, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const serie = await collection.findOne({ _id: new ObjectId(serieId) });

    if (!serie) {
      res.status(404).json({ error: 'Serie no encontrada' });
      return;
    }

    await collection.updateOne({ _id: new ObjectId(serieId) }, { $set: { deshabilitar: 'Disabled' } });
    const updatedSerie = await collection.findOne({ _id: new ObjectId(serieId) });
    res.status(200).json({ message: 'Serie deshabilitada exitosamente', updatedSerie });
    client.close();

  } catch (err) {
    console.error('Error al deshabilitar la serie:', err);
    res.status(500).send('Error interno del servidor');
  }
};


module.exports = { getSeries, getSeriesById, getSeriesByName, getTopSeries, postSeries,updateSeries, disableSerie, enableSerie, getAllSeries  };