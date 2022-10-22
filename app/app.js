const express = require('express')
const cors = require('cors');
const { appRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', appRouter);

exports.app = app;