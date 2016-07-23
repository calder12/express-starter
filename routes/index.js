var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var data = {
    title: 'Express',
    jumbotitle: 'This is a Jumbotron',
    jumbobody: '<p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p><p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a>'
  };
  res.render('index', data);
});

module.exports = router;
