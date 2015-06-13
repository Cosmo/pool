'use strict';

var mongoose = require('mongoose');

switch (process.env.NODE_ENV) {
  case 'development':
    mongoose.connect('mongodb://localhost/pool');
    break;
  case 'production':
    mongoose.connect('mongodb://pool:tzOc4gHSXHJcyGwTCn6WZcW4_2c.M6_C5JmEpzk9uyA-@ds036178.mongolab.com:36178/pool');
    break;
  default:
    throw new Error("Unknown environment");
}

var Activity = require('./activity');
var Transaction = require('./transaction');

var data = [
  {
    activity: {name: 'Burda Hackday', master: 'maccosmo', users: []},
    transactions: [
      {user: "maccosmo", "amount": 12345, "fee": 123, "currency": "eur"},
      {user: "olcaybuyan", "amount": 10000, "fee": 1, "currency": "eur"},
      {user: "thomaspockrandt", "amount": 5000, "fee": 0, "currency": "eur"},
      {user: "donnieraycrisp", "amount": 66000, "fee": 660, "currency": "eur"},
      {user: "kaimys", "amount": 100000, "fee": 1000, "currency": "eur"},
      {user: "maccosmo", "amount": 666, "fee": 0, "currency": "eur"},
      {user: "olcaybuyan", "amount": 12345, "fee": 0, "currency": "eur"},
      {user: "thomaspockrandt", "amount": 1000, "fee": 0, "currency": "eur"},
      {user: "donnieraycrisp", "amount": 10, "fee": 0, "currency": "eur"},
      {user: "kaimys", "amount": 99, "fee": 0, "currency": "eur"}      
    ]
  },
  {
    activity: {name: 'USA Reise', master: 'olcaybuyan', users: []},
    transactions: []
  },
  {
    activity: {name: 'Roundtrip', master: 'thomaspockrandt', users: []},
    transactions: []
  },
  {
    activity: {name: 'Pool Party', master: 'donnieraycrisp', users: []},
    transactions: []
  },
  {
    activity: {name: 'Camping Urlaub', master: 'kaimys', users: []},
    transactions: []
  }
];

data.forEach(function(dataSet) {
  Activity.create(dataSet.activity, function(err, activity) {
    console.log('Activity: ' + dataSet.activity.name);
    if (err) {
      console.log(err);
    } else {
      dataSet.transactions.forEach(function(tr) {
        tr.activity = activity._id;
        Transaction.create(tr, function(err, newTr) {
          console.log('New transaction: ' + newTr._id);
        });
      });
    }
  });
});
