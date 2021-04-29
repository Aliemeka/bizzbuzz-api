require('dotenv').config()

exports.dbUri = process.env.MONGO_URI;
exports.PORT = parseInt(process.env.PORT) || 5000;