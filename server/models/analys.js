// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Analys = new mongoose.Schema({
    
    username: {
      type: String
    },
    ad: {
      type: String
    },
    views: {
      type: Number
    },
    paid: {
      type: Number
    }
   
});




var analys = mongoose.model('analys', Analys);
module.exports = analys;