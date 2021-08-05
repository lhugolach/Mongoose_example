const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome:{
        type: String, 
        required:true
    },
    cognome:{
        type: String, 
        required:true
    }
});

module.exports = mongoose.model('user', userSchema);