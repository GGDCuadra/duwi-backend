const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const moviesRoutes = require('.//src/Routes/MoviesRoutes');
const seriesRoutes = require('.//src/Routes/SeriesRoutes'); 

app.use(moviesRoutes); 
app.use(seriesRoutes); 

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});