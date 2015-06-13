Pool
====

social accounting made easy

Testing with Curl
-----------------


Development
```
curl -X POST --header 'Content-Type:application/json' --header 'x-header: olcay' --data '{"name": "USA Reise"}' 'http://localhost:8080/activities' -vvv

curl -X POST --header 'Content-Type:application/json' --header 'x-header: olcay' --data '{"amount": 12345, "fee": 123, "currency": "eur"}' 'http://localhost:8080/activities/557c309e00f0bebd25643266/transactions' -vvv
```

Production
```
curl -X POST --header 'Content-Type:application/json' --header 'x-header: donnie' --data '{"name": "USA Reise 2"}' 'https://pool-app.herokuapp.com/activities' -vvv
```
