module.exports = {
  activities: [
    {
      id: 3423490823,
      name: "Burda Hackathon",
      master: "cosmo",
      users: [
        { name: "donnieray", amount: 500 },
        { name: "thomazr", amount: -250 },
        { name: "olcay", amount: -250 },
        { name: "cosmo", amount: 45 },
      ]
    },
    {
      id: 3423490823,
      name: "USA Reise",
      master: "olcay",
      users: [
        { name: "donnieray", amount: 500 },
        { name: "thomazr", amount: -250 },
        { name: "olcay", amount: -250 },
        { name: "cosmo", amount: 45 },
      ]
    },
    {
      id: 3423490823,
      name: "Roadtrip",
      master: "donnieray",
      users: [
        { name: "donnieray", amount: 500 },
        { name: "thomazr", amount: -250 },
        { name: "olcay", amount: -250 },
        { name: "cosmo", amount: 45 },
      ]
    }
  ],

  activity: {
    id: 3423490823,
    master: "olcay",
    name: "USA Reise",
    users: [
      { name: "donnieray", amount: 500 },
      { name: "thomazr", amount: -250 },
      { name: "olcay", amount: -250 },
      { name: "cosmo", amount: 45 },
    ],
    transactions: [
      { amount: 2900, fee: 0,   currency: "usd", user: "donnieray" },
      { amount: 999,  fee: 150, currency: "eur", user: "thomazr" },
      { amount: 350,  fee: 150, currency: "usd", user: "cosmo" },
    ],
    total: {
      amount: 4899,
      currency: "eur"
    }
  }
};