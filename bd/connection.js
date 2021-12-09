const mongoose = require("mongoose");
const dbName = 'Sorteos';
const user = 'feel_joe';
const password = 'StdP3875';
const uri = `mongodb+srv://${user}:${password}@cluster0.uhfd5.mongodb.net/${dbName}?retryWrites=true&w=majority`;


mongoose.connect(uri)
    .then(() => console.log('Connection successful'))
    .catch((err) => console.log(err));

module.exports = mongoose;