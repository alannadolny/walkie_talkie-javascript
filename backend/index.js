const express = require('express');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');
const channels = require('./routes/channels');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/users', users);
app.use('/channels', channels);
app.use(cookieParser());

require('dotenv').config();
const dbConnData = {
  host: process.env.MONGO_HOST || '127.0.0.1',
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || 'walkie-talkie',
};

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`,
    {
      useNewUrlParser: true,
    }
  )
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB', error));
