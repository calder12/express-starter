var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var data = {
    title: 'Express',
    jumbotitle: 'This is a Jumbotron',
    jumbobody: '<p>The Jumbotron is variable, it only appears if there is jumbotitle being passed to the view. You can pass different data to each view by setting the jumbotitle and jumbobody variables. The jumbobody variable is rendered as raw HTML to allow for links and other HTML</p><p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>',
    column_setting: '4',
    column: [{
          heading: 'Heading1',
          body: 'Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt. Illa sunt similia: hebes acies est cuipiam oculorum, corpore alius senescit; Respondent extrema primis, media utrisque, omnia omnibus. Quicquid porro animo cernimus, id omne oritur a sensibus; Ut placet, inquit, etsi enim illud erat aptius, aequum cuique concedere. Ut optime, secundum naturam affectum esse possit. Quae tamen a te agetur non melior, quam illae sunt, quas interdum optines. Illis videtur, qui illud non dubitant bonum dicere -;'
        },
        {
          heading: 'Heading2',
          body: 'Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt. Illa sunt similia: hebes acies est cuipiam oculorum, corpore alius senescit; Respondent extrema primis, media utrisque, omnia omnibus. Quicquid porro animo cernimus, id omne oritur a sensibus; Ut placet, inquit, etsi enim illud erat aptius, aequum cuique concedere. Ut optime, secundum naturam affectum esse possit. Quae tamen a te agetur non melior, quam illae sunt, quas interdum optines. Illis videtur, qui illud non dubitant bonum dicere -;'
        },
        {
          heading: 'Heading3',
          body: 'Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt. Illa sunt similia: hebes acies est cuipiam oculorum, corpore alius senescit; Respondent extrema primis, media utrisque, omnia omnibus. Quicquid porro animo cernimus, id omne oritur a sensibus; Ut placet, inquit, etsi enim illud erat aptius, aequum cuique concedere. Ut optime, secundum naturam affectum esse possit. Quae tamen a te agetur non melior, quam illae sunt, quas interdum optines. Illis videtur, qui illud non dubitant bonum dicere -;'
        }]
  };
  res.render('index', data);
});

/* GET test page. */
router.get('/test', function(req, res) {
  var data = {
    title: 'Express: Test Page',
    jumbotitle: 'Test Page',
    jumbobody: '<p>This is just another Jumbotron, nothing to see here, please move along.</p><p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>'
  };
  res.render('index', data);
});

module.exports = router;
