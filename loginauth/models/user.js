var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var dbURI = 'mongodb://localhost/nodeauth';
mongoose.connect(dbURI);
var moment = require('moment');
mongoose.connection.on('connected', function () {  
	console.log('Mongoose default connection open to ' + dbURI);
}); 

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique : true
	},
	password: {
		type: String
	},
	email: {
		type: String,
		index: true,
		unique : true
	},
	name: {
		type: String
	},
	role: {
		type: String
	},
	profileimage:{
		type: String
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


var User = module.exports = mongoose.model('users', UserSchema);

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUsers = function(callback){
	User.find({}, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
   			newUser.password = hash;
   			newUser.save(callback);
    	});
	});
} 

module.exports.deleteUser = function(id, callback){
	User.remove({_id: id, role : {$ne: "admin"} }, callback);
}

module.exports.editUser = function(user, callback){
	var myquery = { _id: user.id };
	var newvalues = { $set: {name: user.name, email : user.email, username : user.username, role : user.role, profileimage : user.profileimage} };
	User.update(myquery, newvalues, callback);
}