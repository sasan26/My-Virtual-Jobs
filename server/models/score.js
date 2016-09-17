// balance model ( gamer and partner username )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserScore = new mongoose.Schema({
    
    balance: {		// available balance
      type: Number
    },
    username: {		// username
      type: String
    }   
});

var score = mongoose.model('score', UserScore);
module.exports = score;