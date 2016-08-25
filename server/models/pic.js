// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
    picurl: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      unique: false
    },
    username: {
      type: String,
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