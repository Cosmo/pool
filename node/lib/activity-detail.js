'use strict';

require('linqjs');
var _ = require('underscore');

var Activity = require('./activity');
var Transaction = require('./transaction');

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

          var users = transactions.groupBy(function (t) { return t.user; });
          var amountTotal = transactions.sum(function(t) { return t.amount + t.fee; });
          users.forEach(function(u) {
              u.amount = (((amountTotal / users.length) - u.sum(function (ut) { return ut.amount + ut.fee; })) * -1);
          });

          // Add invited users without transactions
          activity.users.forEach(function(activityUser) {
            var userInArray = _.some(users, function(transactionUser) {
              return transactionUser.key == activityUser.name;
            });
            if (!userInArray) {
              users.push({key: activityUser.name, amount: 0});
            }
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
