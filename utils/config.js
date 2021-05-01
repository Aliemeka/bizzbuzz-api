require('dotenv').config()

exports.dbUri = process.env.MONGO_URI;
exports.PORT = parseInt(process.env.PORT) || 5000;
exports.SECRET = process.env.SECRET;
exports.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5000';