// analyze model ( partner console )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Analys = new mongoose.Schema({
    
    username: {     // gamer username
      type: String
    },
    ad: {     //  video ad
      type: String
    },
    views: {    // number of views
      type: Number
    },
    paid: {     // total $ paid for the ad
      type: Number
    }   
});

var analys = mongoose.model('analys', Analys);
module.exports = analys;