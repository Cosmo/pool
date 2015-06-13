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

            // users = [{name:"donnie",amount:250},{name:"thomas",amount:-110},...]
            // transactions = [{amount:290,fee:3,currency:"usd",user:"donnie"},...]

            var users = Enumerable.From(transactions)
                .GroupBy("{ name: $.name }", null,
                    function (key, g) {
                        var result = {
                            name: key.name,
                            paidTotal: g.Sum($.amount)
                        }
                    });

            var amountTotal = Enumerable.From(transactions).Sum(function (t) { return t.amount });

            users.ForEach(function(u) {
                u.amount = (((amountTotal / users.length) - u.amount) * -1);
            });
          
          var newActivity = {
            _id: activity._id,
            name: activity.name,
            master: activity.master,
            users: users,
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
