'use strict';

module.exports = {
  activities: [
    {
      id: 3423490823,
      name: "Burda Hackathon",
      master: "maccosmo",
      users: [
        { name: "donnieraycrisp", amount: 500, currency: "eur" },
        { name: "thomaspockrandt", amount: -250, currency: "eur" },
        { name: "olcaybuyan", amount: -250, currency: "eur" },
        { name: "maccosmo", amount: 45, currency: "eur" },
      ]
    },
    {
      id: 3423490823,
      name: "USA Reise",
      master: "olcaybuyan",
      users: [
        { name: "donnieraycrisp", amount: 500, currency: "eur" },
        { name: "thomaspockrandt", amount: -250, currency: "eur" },
        { name: "olcaybuyan", amount: -250, currency: "eur" },
        { name: "maccosmo", amount: 45, currency: "eur" },
      ]
    },
    {
      id: 3423490823,
      name: "Roadtrip",
      master: "donnieraycrisp",
      users: [
        { name: "donnieraycrisp", amount: 500, currency: "eur" },
        { name: "thomaspockrandt", amount: -250, currency: "eur" },
        { name: "olcaybuyan", amount: -250, currency: "eur" },
        { name: "maccosmo", amount: 45, currency: "eur" },
      ]
    }
  ],

  activity: {
    id: 3423490823,
    master: "olcaybuyan",
    name: "USA Reise",
    users: [
      { name: "donnieraycrisp", amount: 500, currency: "eur" },
      { name: "thomaspockrandt", amount: -250, currency: "eur" },
      { name: "olcaybuyan", amount: -250, currency: "eur" },
      { name: "maccosmo", amount: 45, currency: "eur" },
    ],
    transactions: [
      { amount: 2900, fee: 0,   currency: "usd", user: "donnieraycrisp" },
      { amount: 999,  fee: 150, currency: "eur", user: "thomaspockrandt" },
      { amount: 350,  fee: 150, currency: "usd", user: "maccosmo" },
    ],
    total: {
      amount: 4899,
      currency: "eur"
    }
  }
};