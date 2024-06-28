const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://actedcone:dualipa@atlascluster.t9cnxbb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const itemsRouter = require('./routes/items');
app.use('/.netlify/functions/server/items', itemsRouter);

// Define a simple route to test the server
app.get('/.netlify/functions/server/', (req, res) => {
    res.send('Hello, world!');
});

module.exports.handler = serverless(app);
