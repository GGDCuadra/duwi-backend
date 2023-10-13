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
