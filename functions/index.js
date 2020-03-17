const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { apiRouter } = require('./api');
const app = express();

app.use(cors());
app.use('/api', apiRouter);

exports.app = functions.https.onRequest(app);
