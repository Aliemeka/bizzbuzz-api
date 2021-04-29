const express = require('express');
const routes = require('./routes')

const app = express();
 app.use(express.json());

 // Routes
routes(app);

app.listen(5000, ()=>{
    console.log('Listening at port 5000');
})

