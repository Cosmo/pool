var restify = require('restify');
var mongoose = require('mongoose');
var fixtures = require('./lib/fixtures');

switch (process.env.NODE_ENV) {
  case 'development':
    mongoose.connect('mongodb://localhost/pool');
    break;
  default:
    mongoose.connect('mongodb://pool:tzOc4gHSXHJcyGwTCn6WZcW4_2c.M6_C5JmEpzk9uyA-@ds036178.mongolab.com:36178/pool');
}

var Activity = require('./lib/activity');

//Activity.create({name: 'Burda Hackday', master: 'kaimys'});

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
  res.send(fixtures.activities);
  return next();
});

server.get('/activities/:id', function (req, res, next) {
  res.send(fixtures.activity);
  return next();
});

server.get('/xactivities', function (req, res, next) {
  Activity.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
      return next();
    }
  });
});

var port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
