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

var allUsers = [{name: 'maccosmo'}, {name: 'olcaybuyan'}, {name: 'thomaspockrandt'}, {name: 'donnieraycrisp'}, {name: 'kaimys'}];

var data = [
  {
    activity: {name: 'Burda Hackday', master: 'maccosmo', users: allUsers},
    transactions: [
      {name: 'iWatch battery extender', user: 'maccosmo', "amount": 12345, "fee": 123, "currency": "eur"},
      {name: 'Lufhansa', user: 'olcaybuyan', "amount": 10000, "fee": 1, "currency": "eur"},
      {name: 'Dinner', user: 'thomaspockrandt', "amount": 5000, "fee": 0, "currency": "eur"},
      {name: 'Buntstifte', user: 'donnieraycrisp', "amount": 66000, "fee": 660, "currency": "eur"},
      {name: 'Blumenstrauss', user: 'kaimys', "amount": 100000, "fee": 1000, "currency": "eur"},
      {name: 'Big Mac', user: 'maccosmo', "amount": 666, "fee": 0, "currency": "eur"},
      {name: 'iOS for Dummies', user: 'olcaybuyan', "amount": 12345, "fee": 0, "currency": "eur"},
      {name: 'Secrets of El Cap', user: 'thomaspockrandt', "amount": 1000, "fee": 0, "currency": "eur"},
      {name: 'Radiergummi', user: 'donnieraycrisp', "amount": 10, "fee": 0, "currency": "eur"},
      {name: 'Kaugummi', user: 'kaimys', "amount": 99, "fee": 0, "currency": "eur"}
    ]
  },
  {
    activity: {name: 'USA Reise', master: 'maccosmo', users: allUsers},
    transactions: [
      {name: 'Hotel', user: 'maccosmo', "amount": 12345, "fee": 123, "currency": "eur"},
      {name: 'Taxi', user: 'olcaybuyan', "amount": 10000, "fee": 1, "currency": "eur"},
      {name: 'Dinner', user: 'thomaspockrandt', "amount": 5000, "fee": 0, "currency": "eur"},
      {name: 'Pampers', user: 'donnieraycrisp', "amount": 66000, "fee": 660, "currency": "eur"},
      {name: 'Uber', user: 'kaimys', "amount": 100000, "fee": 1000, "currency": "eur"},
      {name: 'Big Mac', user: 'maccosmo', "amount": 666, "fee": 0, "currency": "eur"},
      {name: 'Trip to Sausalito', user: 'olcaybuyan', "amount": 12345, "fee": 0, "currency": "eur"},
      {name: 'Taxi', user: 'thomaspockrandt', "amount": 1000, "fee": 0, "currency": "eur"},
      {name: 'BART Ticket', user: 'donnieraycrisp', "amount": 10, "fee": 0, "currency": "eur"},
      {name: 'Miete Wohnwagen', user: 'kaimys', "amount": 99, "fee": 0, "currency": "eur"}
    ]
  },
  {
    activity: {name: 'Roundtrip', master: 'maccosmo', users: allUsers},
    transactions: [
      {name: 'Hotel', user: 'maccosmo', "amount": 12345, "fee": 123, "currency": "eur"},
      {name: 'Taxi', user: 'olcaybuyan', "amount": 10000, "fee": 1, "currency": "eur"},
      {name: 'Dinner', user: 'thomaspockrandt', "amount": 5000, "fee": 0, "currency": "eur"},
      {name: 'Hotel', user: 'donnieraycrisp', "amount": 66000, "fee": 660, "currency": "eur"},
      {name: 'Taxi', user: 'kaimys', "amount": 100000, "fee": 1000, "currency": "eur"},
      {name: 'Dinner', user: 'maccosmo', "amount": 666, "fee": 0, "currency": "eur"},
      {name: 'Hotel', user: 'olcaybuyan', "amount": 12345, "fee": 0, "currency": "eur"},
      {name: 'Taxi', user: 'thomaspockrandt', "amount": 1000, "fee": 0, "currency": "eur"},
      {name: 'Dinner', user: 'donnieraycrisp', "amount": 10, "fee": 0, "currency": "eur"},
      {name: 'Tip', user: 'kaimys', "amount": 99, "fee": 0, "currency": "eur"}
    ]
  },
  {
    activity: {name: 'Pool Party', master: 'donnieraycrisp', users: [{name: 'donnieraycrisp'}]},
    transactions: []
  },
  {
    activity: {name: 'Camping Urlaub', master: 'kaimys', users: [{name: 'kaimys'}]},
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
