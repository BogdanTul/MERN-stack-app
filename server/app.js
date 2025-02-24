const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(res.headerSent){
    return next(error)
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'Unknown error'})
});

const dbUrl = 'mongodb+srv://test:test@cluster0.xtlfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(dbUrl)
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err)
  });
