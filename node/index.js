var restify = require('restify');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

switch (process.env.NODE_ENV) {
  case 'development':
    mongoose.connect('mongodb://localhost/pool');
    break;
  default:
    mongoose.connect('mongodb://pool:tzOc4gHSXHJcyGwTCn6WZcW4_2c.M6_C5JmEpzk9uyA-@ds036178.mongolab.com:36178/pool');

}

var activitySchema = new Schema({
  id:       Schema.ObjectId,
  name:     String,
  master:   String
});
var Activity = mongoose.model('Activity', activitySchema);

Activity.create({name: 'Burda Hackday', master: 'kaimys'});

var server = restify.createServer({
  name: 'pool-backend',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.get('/activities', function (req, res, next) {
  Activity.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
      return next();
    }
  });
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
