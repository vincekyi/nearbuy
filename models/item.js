// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var itemSchema = mongoose.Schema({
    itemID        :   mongoose.Schema.Types.ObjectId,
    name          :   String,
    description   :   String,
    postDate      :   { type: Date, default: Date.now },
    expiration    :   Date,
    imageDir      :   String

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Item', itemSchema);
