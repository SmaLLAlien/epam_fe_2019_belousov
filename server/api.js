const log = require( INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
// const UserModel = require(INCPATH + '/mongoose').UserModel;
const fs = require("fs");

let list;

fs.readFile("./config/articles.json", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  list = data;
  list = JSON.parse(list);

});


router.get("/some-request", function(req, res) {
    const user = UserModel({
        name: 'test'
    });

    UserModel.find((err, users) => {
        if(err) {
            log.error('Error find users in Mongo');
        }
        log.info('Users finds');
        res.end(JSON.stringify(users));
    });
});

router.get("/articles",function (req, res) {
    log.info("==Get all list articles==");
    res.end(JSON.stringify(list));
  });
  router.post("/create-article",function (req, res) {
    log.info("==Save article==");
    list.push(req.body);
    res.end(JSON.stringify(list));
  });
  router.delete("/delete-articles", function (req, res) {
    log.info('==Delete all articles==');
    list = [];
    // remove data from file
    fs.writeFile('./config/articles.json', JSON.stringify([{}]), (err) => {
      if (err) {
        console.error(err)
        return
      }
    });
    res.end(JSON.stringify(list));
  });

  router.get("/articles/:id", function (req, res) {
    log.info("==Get article by id==");
    const articleById = list.find(article => +article.id === +req.params.id);
    res.end(JSON.stringify(articleById));
  });

 router.delete("/delete-articles/:id", function (req, res) {
    log.info('==Delete article by id==');
    const previousLength = list.length;
    list = list.filter(article => {
      if (+article.id !== +req.params.id) {
        return article;
      }
    });
    if (previousLength === list.length) {
      res.sendStatus(404);
    } else {
      // rewrite data in file
      fs.writeFile('./config/articles.json', JSON.stringify(list), (err) => {
        if (err) {
          console.error(err)
          return
        }
      });
      res.end(JSON.stringify(list));
    }
  });

  router.put("/update-articles/:id", function (req, res) {
    log.info('==Update article by id==');
    const articleIndexById = list.findIndex(article => +article.id === +req.params.id);

    if (articleIndexById !== -1) {
      list[articleIndexById] = req.body;
      // rewrite data in file
      fs.writeFile('./config/articles.json', JSON.stringify(list), (err) => {
        if (err) {
          console.error(err)
          return
        }
      });
      res.end(JSON.stringify(list[articleIndexById]));
    } else {
      res.sendStatus(404);
    }
  });


module.exports = router;
