'use strict';

var restify = require('restify');
var mongoose = require('mongoose');
var _ = require('underscore');
var fixtures = require('./fixtures');
var rates = require('./get-rates');

var port = process.env.PORT || 8080;

switch (process.env.NODE_ENV) {
  case 'development':
    mongoose.connect('mongodb://localhost/pool');
    break;
  default:
    mongoose.connect('mongodb://pool:tzOc4gHSXHJcyGwTCn6WZcW4_2c.M6_C5JmEpzk9uyA-@ds036178.mongolab.com:36178/pool');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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
    master: req.headers['x-header'],
    users: [{name: req.headers['x-header']}]
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
      var result = [];
      docs.forEach(function(doc) {
        var userInvited = _.some(doc.users, function(o) {
          return o.name == req.headers['x-header'];
        });
        if (userInvited) {
          result.push(doc);
        }
      });
      res.send(result);
      next();
    }
  });
});

server.get('/activities/:id', activityDetail);

server.post('/activities/:activity/transactions', function (req, res, next) {
  var amount;
  if (req.body.currency != 'eur') {
    amount = Math.round(rates[req.body.currency] * req.body.amount);
  } else {
    amount = req.body.amount;
  }
  var transaction = {
    activity: req.params.activity,
    user: req.headers['x-header'],
    name: req.body.name,
    amount: amount,
    fee: parseInt(req.body.fee),
    currency: 'eur'
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
      var userAlreadyInvited = _.some(activity.users, function(o) {
        return o.name == req.body.name;
      });
      if(!userAlreadyInvited) {
        activity.users.push({name: req.body.name});
        activity.save(function(err) {
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

server.post('/convertToEur', function (req, res, next) {
  if (rates[req.body.currency]) {
    var amount = Math.round(rates[req.body.currency] * req.body.amount);
    res.send({currency: 'eur', amount: amount});
    next();
  } else {
    console.log('Currency table not loaded');
    next('Exchange rates not loaded!');
  }
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
