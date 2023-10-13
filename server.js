const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const cors = require('cors'); 

app.use(express.json());


app.use(cors({
  origin: 'http://localhost:3000',  
  optionsSuccessStatus: 200  
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://DBUSER:PF123@cluster0.x6eafwv.mongodb.net/DB_PF', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Conexión a MongoDB establecida');
});

const moviesRoutes = require('./src/Routes/MoviesRoutes');
const seriesRoutes = require('./src/Routes/SeriesRoutes');

app.use('/', moviesRoutes);
app.use('/', seriesRoutes);

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
const express = require("express");

const app = express();

const port = process.env.PORT || 3001;


app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://DBUSER:PF123@cluster0.x6eafwv.mongodb.net/DB_PF', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Conexión a MongoDB establecida');
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PTIONS, PUT, DELETE');
  next();
});
const moviesRoutes = require('./src/Routes/MoviesRoutes');
const seriesRoutes = require('./src/Routes/SeriesRoutes');
app.use('/', moviesRoutes);
app.use('/', seriesRoutes);

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
module.exports = app;