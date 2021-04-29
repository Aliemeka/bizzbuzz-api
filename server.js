const express = require('express');
const morgan = require('morgan')
const start = require('./kernel')

const routes = require('./routes');

const app = express();

// Middlewares
app.use(morgan('dev'))
app.use(express.json());

 // Routes
routes(app);

start(app)

