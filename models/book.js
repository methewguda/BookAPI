var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://bookapi:bookapi@ds023455.mlab.com:23455/bookapi');
var schema = mongoose.Schema;

var book = new schema({
    title:{
        type: String
    },
    author:{
        type: String
    },
    genre:{
        type: String
    },
    read:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('books', book);