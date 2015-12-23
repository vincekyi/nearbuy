// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Item     = require('./item.js');

// define the schema for our user model
var packSchema = mongoose.Schema({
    packId        :   mongoose.Schema.Types.ObjectId,
    user          :   String,
    items         :   [Item.schema]
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Pack', packSchema);
