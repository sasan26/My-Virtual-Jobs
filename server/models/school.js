// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var School = new mongoose.Schema({
    
    
    degree: {
      type: String
    },
    userScore: {
      type: Number
    },
    username: {
      type: String
    }
   
});




var shoolgrade = mongoose.model('shoolgrade', School);
module.exports = shoolgrade;