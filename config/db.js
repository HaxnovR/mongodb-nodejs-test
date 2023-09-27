const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017').on('open', () => {
    console.log('database Connected');
}).on('error', () => {
    console.log('database Error');
});

module.exports = connection;