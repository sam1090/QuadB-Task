const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Ticker = require('./ticker')


const app = express();

// MongoDB connection details
const mongoURI = 'your_mongodb_uri';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });


  app.get('/tickers', async (req, res) => {
    try {
      const tickers = await Ticker.find().limit(10).exec();
      console.log("checking ");
      res.json(tickers);
    } catch (error) {
      console.error('Error fetching tickers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  const port = 3000; // Or any other port number you prefer
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
