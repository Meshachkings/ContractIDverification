const { boolean } = require('webidl-conversions');


const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firtname: String,
    lastname: String, 
    
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);