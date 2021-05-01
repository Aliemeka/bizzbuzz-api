const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        expires: 1800
    }
});



const Token = mongoose.model('Token', tokenSchema);

module.exports = Token; 