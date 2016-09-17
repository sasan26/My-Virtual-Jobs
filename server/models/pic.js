// job model ( partner and gamer console )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    picurl: {   // picture ad url
      type: String,
      required: true,
    },
    filename: {   // picture filename
      type: String,
      unique: false
    },
    username: {   // partner username
      type: String,
      trim: true
    },
    videoId: {    // youtube video ad ID
      type: String,
      required: true
    },
    job: {  //  job category-degree-coin-title
      type: String,
      required: true
    }   
});

var pic = mongoose.model('pic', UserSchema);
module.exports = pic;