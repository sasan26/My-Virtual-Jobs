// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
    picurl: {
      type: String,
      unique: true,
      required: true,
    },
    filename: {
      type: String,
      unique: false
    },
    username: {
      type: String,
      unique: true,
      trim: true
    },
    videoId: {
      type: String,
      required: true
    },
    job: {
      type: String,
      required: true
    }
   
});




var pic = mongoose.model('pic', UserSchema);
module.exports = pic;