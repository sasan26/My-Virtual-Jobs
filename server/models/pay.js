// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Pay = new mongoose.Schema({
    
    status: {
      type: String
    }
   
});




var pay = mongoose.model('pay', Pay);
module.exports = pay;