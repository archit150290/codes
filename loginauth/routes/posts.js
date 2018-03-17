var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/posts' })

var post = require('../models/posts');

router.get('/', function(req, res, next) {
    post.showAll(function(err, posts){
        posts.desc;
        res.render("showposts", {title: "Posts", posts : posts});
    });
});

router.get('/add', function(req, res, next) {
  console.log("===========inside index add ");
  var Category = require('../models/categories');
  Category.showAll(function(err, cat){
    res.render("addpost", {title : "Add Post", categories : cat});
  });
});

router.post('/add', upload.single('featuredimage'), function(req, res){
    var title = req.body.title;
    var desc = req.body.desc;
    var category = req.body.category;
    
    console.log(title)
    console.log(desc)
    console.log(category)
    console.log(req.file)
    if(req.file){
        var featuredimage = req.file.filename
    }else{
        var featuredimage = "featuredimage.jpg"
    }
    var Post = new post({
        title : title,
        desc : desc,
        category : category,
        featuredimage : featuredimage
    });
    post.createPosts(Post, function(err, postcreated){
        if(err){
            console.log(err);
            req.flash('message', err.errmsg);
            //res.location('/categories/add');
            res.redirect('/posts/add');
        }else{
            console.log(postcreated)
            req.flash('message', "Post Created");
            //res.location('/categories/add');
            res.redirect('/posts/');
        }
    })
})

module.exports = router;
