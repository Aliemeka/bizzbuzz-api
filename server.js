const express = require('express');
const morgan = require('morgan')

const routes = require('./routes');

const app = express();

// Middlewares
app.use(morgan('dev'))
app.use(express.json());

 // Routes
routes(app);

app.listen(5000, ()=>{
    console.log('Listening at port 5000');
})

