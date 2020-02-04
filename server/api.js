const log = require( INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
const ArticleModel = require(INCPATH + '/mongoose').ArticleModel;
const fs = require("fs");
const ObjectId = require(INCPATH + '/mongoose').ObjectId;

let articlesLength = 0;

// get articles from file and push them to bd, to make easy testing for you
ArticleModel.find((err, users) => {
  if(err) {
    return log.error('Error find users in Mongo');
  }
  log.info('Users finds');
  articlesLength = users.length;
  if(!articlesLength) {
    addArticlesToBDFromFile(); // add some articles to bd, for you
  }
});

function addArticlesToBDFromFile(){
  fs.readFile("./config/articles.json", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    const articles = JSON.parse(data);
    articlesLength = articles.length;
    articles.forEach(article => {
      const newArticle = ArticleModel(article);
      newArticle.save();
    });
  });
}


router.get("/", function(req, res) {
    const user = ArticleModel({
        name: 'test'
    });

  ArticleModel.find((err, users) => {
        if(err) {
            return log.error('Error find users in Mongo');
        }
        log.info('Users finds');
        res.end(JSON.stringify(users));
  });
});

router.get("/articles",function (req, res) {
    log.info("==Get all list articles==");
  ArticleModel.find()
    .then(articles => {
    log.info('Articles finds');
    res.end(JSON.stringify(articles));
  })
    .catch(err => log.error('Error find articles in Mongo' + err));
  });

  router.post("/create-article",function (req, res) {
    const article = ArticleModel(req.body);
    article.save()
      .then(article => {
        log.info("==Save article==");
        articlesLength++;
        res.end(JSON.stringify(article))
      })
      .catch(err => {
        log.error('Error save articles in Mongo' + err)
      });
  });

  router.delete("/delete-articles", function (req, res) {
    log.info('==Delete all articles==');
    ArticleModel.deleteMany({})
      .then(answer => {
        articlesLength = 0;
        res.end(JSON.stringify({deleted: answer.deletedCount}));
      })
      .catch(err => log.error('Error deleting articles in Mongo' + err));

  });

  router.get("/articles/:id", function (req, res) {
    log.info("==Get article by id==");

    ArticleModel.findOne({_id: ObjectId(req.params.id)})
      .then(article => {
        res.end(JSON.stringify(article))
      })
      .catch(err => log.error('Error finding article in Mongo' + err));
  });

  router.delete("/delete-articles/:id", function (req, res) {
    log.info('==Delete article by id==');
    ArticleModel.deleteOne({_id: ObjectId(req.params.id)})
      .then(answer => {
        articlesLength--;
        articlesLength = articlesLength < 0 ? 0 : articlesLength;
        res.end(JSON.stringify({deleted: answer.deletedCount, articles: articlesLength}));
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.put("/update-articles/:id", function (req, res) {
    log.info('==Update article by id==');

    ArticleModel.updateOne({_id: ObjectId(req.params.id)}, req.body)
      .then( answer => {
        console.log(answer);
        res.end(JSON.stringify({modified: answer.ok}));
      })
      .catch(err => {
        console.log(err);
      });
  });


module.exports = router;
