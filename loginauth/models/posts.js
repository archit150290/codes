var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var dbURI = 'mongodb://localhost/nodeauth';
mongoose.connect(dbURI);
var moment = require('moment');
mongoose.connection.on('connected', function () {  
	console.log('Mongoose default connection open to ' + dbURI);
}); 


var postschema = mongoose.Schema({
	title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    featuredimage: {
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



var posts = module.exports = mongoose.model('posts', postschema);

module.exports.createPosts = function(newpost, callback){
    newpost.save(callback);
}

module.exports.showAll = function(callback){
    //posts.find({}, null,  {sort: {id: 1}}, callback);
    posts.find({}).sort({ currenttime : "desc"}).exec(callback);
}
/* module.exports.showroles = function(callback){
    Role.find({}, callback);
} */
