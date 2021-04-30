const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const start = require('./kernel');

const routes = require('./routes');

const app = express();

// Middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

 // Routes
routes(app);

start(app)

