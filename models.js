const { default: mongoose } = require("mongoose");

const NewUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: false
    },

    email: {
        type: String,
        pattern: "@birlasoft\.com$",
    },

    password: {
        type : String,
        required : true ,
        unique : true,
        trim : true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', NewUserSchema);



