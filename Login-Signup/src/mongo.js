const mongoose = require("mongoose");

// Establishing a connection to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/userlogin')
    .then(() => {
        console.log('Mongoose connected');
    })
    .catch((e) => {
        console.log('Connection failed');
    });

// Defining the schema for the login collection
const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Creating the model based on the schema
const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
