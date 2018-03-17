var express = require('express');
var router = express.Router();

var Category = require('../models/categories');

router.get('/', function(req, res, next) {
  Category.showAll(function(err, cat){
    res.render('show', { title: 'Available Categories', data : cat, datalength:Object.keys(cat).length});
  });
  
});

router.get('/add', function(req, res, next) {
  res.render('addcat', { title: 'Add Categories'});
});

router.post('/add', function(req, res, next) {
  var category = new Category({
    name : req.body.name
  });
  Category.createCategory(category, function(err, cat){
    if(err){
      console.log(err);
      req.flash('message', err.errmsg);
      //res.location('/categories/add');
      res.redirect('/categories/add');
    }else{
      req.flash('message', "Success");
      //res.location('/categories/');
      res.redirect('/categories/');
    }
    
  });
});



module.exports = router;
