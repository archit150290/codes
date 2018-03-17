var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
  dest: './uploads'
});

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var RememberMeStrategy = require('passport-remember-me').Strategy;
console.log(RememberMeStrategy);

var User = require('../models/user');
var Role = require('../models/role');
var moment = require('moment');
console.log(moment().format());

/* var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost/", function (err, db) {
   
    if (err) throw err;
    var dbo = db.db("nodeauth");
    dbo.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
                
}); */




/* GET users listing. */
//router.get('/', isAuthenticated, function (req, res, next) {
router.get('/', function (req, res, next) {
 
  User.getUsers(function (err, docs) {
    res.render('users', {title : "Users Available", data : docs});
  });
});

router.get('/login', function (req, res, next) {
  res.render("login", {
    title: "Login"
  });
});

router.post("/login", 
  passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Invalid username or password'}),
  function(req, res, next) {
    // issue a remember me cookie if the option was checked
    if (!req.body.remember_me) { return next(); }

    var token = utils.generateToken(64);
    Token.save(token, { userId: req.user.id }, function(err) {
      if (err) { return done(err); }
      res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // 7 days
      return next();
    });
  },
  function(req, res) {
   if(req.body.remember_me){
      var cookie = req.cookies.rememberme;
      if (cookie === undefined)
      {
        // no: set a new cookie
        var randomNumber=Math.random().toString();
        randomNumber=randomNumber.substring(2,randomNumber.length);
        res.cookie('rememberme',randomNumber, { maxAge: 900000, httpOnly: true });
        console.log('cookie created successfully');
      } 
      else
      {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
      } 
   }
   req.flash('success', 'You are now logged in');
   res.redirect('/users/');
});


passport.serializeUser(function(user, done) {
  console.log("serializeUser")
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser")
  User.getUserById(id, function(err, user) {
    
    done(err, user);
  });
});

/* passport.use(new RememberMeStrategy(
  function(token, done) {
    Token.consume(token, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  },
  function(user, done) {
    var token = utils.generateToken(64);
    Token.save(token, { userId: user.id }, function(err) {
      if (err) { return done(err); }
      return done(null, token);
    });
  }
)); */

passport.use(new LocalStrategy({
  usernameField: 'username1',
  passwordField: 'password1',
},function(username, password, done){
  console.log("entered")
  User.getUserByUsername(username, function(err, user){
    console.log("getUserByUsername")
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      console.log("comparePassword")
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Invalid Password'});
      }
    });
  });
}));



passport.use(new RememberMeStrategy(
  function(token, done) {
    Token.consume(token, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  },
  function(user, done) {
    var token = utils.generateToken(64);
    Token.save(token, { userId: user.id }, function(err) {
      if (err) { return done(err); }
      return done(null, token);
    });
  }
));




router.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/users');
  });
});


//==to add roles
router.get("/roles", function(req, res){
  //if(typeof res.locals.message != "undefined")
  
  //res.render("roles",{title : "Roles", message : req.flash("message")});
  res.render("roles",{title : "Roles"});
})

router.post("/roles", function(req, res, next){
  var role = req.body.role;
  var role = new Role({
    role : role
  });
  Role.createRole(role, function(err, role){
    if(err){
      req.flash('message', err.errmsg);
      res.location('/users/roles');
      res.redirect('/users/roles');
    }else{
      req.flash('message', "Success");
      res.redirect('/users/register');
    }
  })
})

router.get("/delete/:id", function(req, res){
  User.deleteUser(req.params.id, function(err, resultant){
    if(err){
      res.json({status:404, data:err.message});
    }else if(resultant.n == 1){
      res.json({status:200, data:'User Deleted'});
    }else{
      res.json({status:200, data:'User is admin, cannot delete...'});
    }
  });
});



router.get('/register', function (req, res, next) {
  Role.showroles(function(err, docs){
      res.render("register", {
        title: "Register User",
        roles : docs
      });
  });
});

router.post("/register", upload.single('profileimage'), function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var role = req.body.role;
  if (req.file) {
    console.log('Uploading File...');
    var profileimage = req.file.filename;
  } else {
    console.log('No File Uploaded...');
    var profileimage = 'noimage.jpg';
  }

  var newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password,
    role: role,
    profileimage: profileimage
  });

  User.createUser(newUser, function(err, user){
    console.log(err)
    if(err){
      req.flash('message', err.errmsg);
      res.location('/users/register');
      res.redirect('/users/register');
      return false;
    }else{
      req.flash('success', 'You are now registered and can login');
      res.location('/users/');
      res.redirect('/users/');
    }
  });
});

//=edit users
router.get("/edituser/:id", function(req, res){
  User.getUserById(req.params.id, function(err, user) {
    console.log(user)
    Role.showroles(function(err, docs){
     res.render("edituser", {title : "Edit User", user : user, roles : docs});
    });
  });
});

router.post("/edituser", upload.single('profileimage'), function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var role = req.body.role;
  var id = req.body.id;
  if (req.file) {
    console.log('Uploading File...');
    var profileimage = req.file.filename;
  } else {
    console.log('No File Uploaded...');
    var profileimage = req.body.profileimagetext;
  }

  var user = {
    id : id,
    name: name,
    email: email,
    username: username,
    role: role,
    profileimage: profileimage
  };

  User.editUser(user, function(err, result){
      if(err){
        req.flash('message', err.errmsg);
        res.location('/users/register');
        res.redirect('/users/register');
        return false;
      }else if(result.n == 1){
        req.flash('success', 'User Updated');
        res.location('/users/');
        res.redirect('/users/');
      }
    
  /*   if(err){
      req.flash('message', err.errmsg);
      res.location('/users/register');
      res.redirect('/users/register');
      return false;
    }else{
      req.flash('success', 'You are now registered and can login');
      res.location('/users/');
      res.redirect('/users/');
    } */
  });
});

module.exports = router;