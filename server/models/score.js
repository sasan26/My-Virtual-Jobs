// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserScore = new mongoose.Schema({
    
    balance: {
      type: Number
    },
    degree: {
      type: String
    },
    username: {
      type: String
    }
   
});




var score = mongoose.model('score', UserScore);
module.exports = score;