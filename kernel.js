const mongoose = require("mongoose")

const { dbUri, PORT } = require("./utils/config")

module.exports = app =>{
    
    mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
    .then(res => app.listen(PORT, ()=>console.log("Web application started at port: " + PORT)))
    .catch(err => console.log(err))
}