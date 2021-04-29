const mongoose = require("mongoose")

const { dbUri } = require("./utils/config")

module.exports = app =>{
    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => app.listen(5000, ()=>console.log("Web application started")))
    .catch(err => console.log(err))
}