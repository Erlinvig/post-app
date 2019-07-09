const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const keys = require('./keys');
const app = express();

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.error(error));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
