var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var data = {
    title: 'Express',
    jumbotitle: 'This is a Jumbotron',
    jumbobody: '<p>The Jumbotron is variable, it only appears if there is jumbotitle being passed to the view. You can pass different data to each view by setting the jumbotitle and jumbobody variables. The jumbobody variable is rendered as raw HTML to allow for links and other HTML</p><p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a>'
  };
  res.render('index', data);
});

module.exports = router;
