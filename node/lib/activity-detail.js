'use strict';

var Activity = require('./activity');
var Transaction = require('./transaction');
var Enumerable = require('linqjs');

function activityDetail(req, res, next) {
  Activity.findById(req.params.id, function (err, activity) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      Transaction.find({activity: req.params.id}, function (err, transactions) {
        if (err) {
          console.log(err);
          next(err);
        } else {
            var users = transactions.groupBy(function (t) { return t.user });

            var amountTotal = transactions.sum(function(t) { return t.amount + t.fee });

            users.forEach(function(u) {
                u.amount = (((amountTotal / users.length) - u.sum(function (ut) { return ut.amount + ut.fee })) * -1);
            });
          
          var newActivity = {
            _id: activity._id,
            name: activity.name,
            master: activity.master,
            users: users.select(function (u) { return { name: u.key, amount: Math.floor(u.amount) }}),
            transactions: transactions,
            total: {
                amount: amountTotal, currency: "eur"
            }
          };
          res.send(newActivity);
          next();
        }
      });
    }
  });
}

module.exports = activityDetail;
