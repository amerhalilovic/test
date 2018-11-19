var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var movieSchema = new Schema({
	'title' : String,
	'genre' : String,
	'description' : String,
	'imageurl' : String
	
});

module.exports = mongoose.model('movie', movieSchema);
