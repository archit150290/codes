var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var dbURI = 'mongodb://localhost/nodeauth';
mongoose.connect(dbURI);
var moment = require('moment');
mongoose.connection.on('connected', function () {  
	console.log('Mongoose default connection open to ' + dbURI);
}); 


var categoryschema = mongoose.Schema({
	name: {
        type: String,
        required: true,
        unique: true
    },
    currenttime:{
		type: Date,
		default: moment().format(),
	},
	updatedtime : {
		type: Date,
		default: moment().format(),
	}
});



var categories = module.exports = mongoose.model('categories', categoryschema);

module.exports.createCategory = function(newcategory, callback){
    newcategory.save(callback);
}

module.exports.showAll = function(callback){
    categories.find({}, callback);
}
/* module.exports.showroles = function(callback){
    Role.find({}, callback);
} */
