var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var dbURI = 'mongodb://localhost/nodeauth';
mongoose.connect(dbURI);
var moment = require('moment');
mongoose.connection.on('connected', function () {  
	console.log('Mongoose default connection open to ' + dbURI);
}); 


var roleschema = mongoose.Schema({
	role: {
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



var Role = module.exports = mongoose.model('roles', roleschema);

module.exports.createRole = function(newrole, callback){
    newrole.save(callback);
}

module.exports.showroles = function(callback){
    Role.find({}, callback);
}
