// school grade model ( gamer console )
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var School = new mongoose.Schema({
       
    degree: {	// category-degree-score
      type: String
    },
    userScore: {	// gamer user score
      type: Number
    },
    username: {		// gamer username
      type: String
    }   
});

var shoolgrade = mongoose.model('shoolgrade', School);
module.exports = shoolgrade;