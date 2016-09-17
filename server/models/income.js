// gamer income model ( gamer console - profile )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PayHis = new mongoose.Schema({
    
    date: {   // income date
      type: String
    },
    username: {   // gamer username
      type: String
    },
    coins: {    // income ( coins )
      type: String
    },
    employer: {   // partner name
      type: String
    }
});

var income = mongoose.model('income', PayHis);
module.exports = income;