'use strict';

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
          var newActivity = {
            _id: activity._id,
            name: activity.name,
            master: activity.master,
            users: [],
            transactions: transactions
          };
          res.send(newActivity);
          next();
        }
      });
    }
  });
}

module.exports = activityDetail;
