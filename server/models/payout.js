// pauout history model ( partner console )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PayHis = new mongoose.Schema({
    
    date: {   // payout date
      type: String
    },
    username: {   // gamer username
      type: String
    },
    coins: {  // payout coins
      type: String
    },
    employee: {   // partner username
      type: String
    }  
});

var payout = mongoose.model('payout', PayHis);
module.exports = payout;