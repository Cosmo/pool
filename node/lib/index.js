'use strict';

var restify = require('restify');
var mongoose = require('mongoose');
var fixtures = require('./fixtures');

var port = process.env.PORT || 8080;

switch (process.env.NODE_ENV) {
  case 'development':
    mongoose.connect('mongodb://localhost/pool');
    break;
  default:
    mongoose.connect('mongodb://pool:tzOc4gHSXHJcyGwTCn6WZcW4_2c.M6_C5JmEpzk9uyA-@ds036178.mongolab.com:36178/pool');
}

var Activity = require('./activity');
var Transaction = require('./transaction');

var activityDetail = require('./activity-detail');

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

server.get('/fixtures/activities', function (req, res, next) {
  res.send(fixtures.activities);
  next();
});

server.get('/fixtures/activities/:id', function (req, res, next) {
  res.send(fixtures.activity);
  next();
});

server.post('/activities', function (req, res, next) {
  var activity = {
    name: req.body.name,
    master: req.headers['x-header']
  };
  Activity.create(activity, function (err, newActivity) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.send(newActivity);
      next();
    }
  });
});

server.get('/activities', function (req, res, next) {
  Activity.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.send(docs);
      next();
    }
  });
});

server.get('/activities/:id', activityDetail);

server.post('/activities/:activity/transactions', function (req, res, next) {
  var transaction = {
    activity: req.params.activity,
    user: req.headers['x-header'],
    amount: parseInt(req.body.amount),
    fee: parseInt(req.body.fee),
    currency: req.body.currency
  };
  Transaction.create(transaction, function (err, newTransaction) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.send(newTransaction);
      next();
    }
  });
});

server.post('/activities/:id/invite', function (req, res, next) {
  Activity.findById(req.params.id, function (err, activity) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      if(activity.users.indexOf(req.body.name) < 0) {
        activity.users.push(req.body.name);
        activity.update(function(err) {
          if (err) {
            console.log(err);
            next(err);
          } else {
            res.send(activity);
            next();
          }
        });
      } else {
        res.send(activity);
        next();
      }
    }
  });
});

server.get('/activities/:activity/transactions', function (req, res, next) {
  Transaction.find({activity: req.params.activity}, function (err, docs) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.send(docs);
      next();
    }
  });
});


server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
