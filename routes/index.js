var router = require('express').Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

router.use('/articles', require('./articles'));

/* GET home page. */
router.get('/', (request, response, next) => {
  Article.find().exec()
    .then(articles => {
      response.render('home', {articles});

    })
});

module.exports = router;
