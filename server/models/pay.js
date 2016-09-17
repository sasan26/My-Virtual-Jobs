// payment method status model ( gamer and partner console )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pay = new mongoose.Schema({
    
    status: {		// status ( successfull or faild )
      type: String
    }   
});

var pay = mongoose.model('pay', Pay);
module.exports = pay;