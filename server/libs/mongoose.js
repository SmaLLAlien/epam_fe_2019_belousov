const mongoose    = require('mongoose'),
      log = require(INCPATH + '/log')(module),
      config = require(INCPATH + '/config');
      Q = require('q');

mongoose.connect(config.get('db'));
const db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Article = new Schema({
  type: String, default : 'Text',
  url: String , default : '',
  title: String, default : '',
  author: String , default : '',
  authorPhoto: String , default : '',
  date: String, default : '',
  time: String, default : '',
  quote: String, default : '',
  urlPreview: String, default : '',
  commentsCount: String, default : '',
  stars: String, default : '',
  like: String, default : '',
  likesCounter: Number, default : 0,
  facebook: String, default : '',
  insta: String, default : '',
  basket: String, default : '',
  commentsIcon: String, default : '',
  desc: {}, default : {}
});

module.exports.ArticleModel = mongoose.model('Article', Article);
module.exports.ObjectId = ObjectId;
