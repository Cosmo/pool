Pool
====

social accounting made easy

Testing 
-------

Development
```
curl -X POST --header 'Content-Type:application/json' --header 'x-header: olcay' --data '{"name": "USA Reise"}' 'http://localhost:8080/activities' -vvv

curl -X POST --header 'Content-Type:application/json' --header 'x-header: olcay' --data '{"name": "iOS for Dummies", "amount": 1234, "fee": 123, "currency": "usd"}' 'http://localhost:8080/activities/557d52f741f3823f5e3f96c1/transactions' -v

curl -X POST --header 'Content-Type:application/json' --header 'x-header: olcay' --data '{"name": "donnieraycrisp"}' 'http://localhost:8080/activities/557c9737e97b8e50401230cb/invite' -v

curl -X POST --header 'Content-Type:application/json' --data '{"currency": "usd", amount: 10000}' 'http://localhost:8080/convertToEur' -v
```

Production
```
curl -X POST --header 'Content-Type:application/json' --header 'x-header: donnie' --data '{"name": "USA Reise 2"}' 'https://pool-app.herokuapp.com/activities' -vvv

curl -X POST --header 'Content-Type:application/json' --header 'x-header: donnie' --data '{"amount": 12345, "fee": 123, "currency": "eur"}' 'https://pool-app.herokuapp.com/activities/557c3393dbcb495a28e6e022/transactions' -vvv

curl -X POST --header 'Content-Type:application/json' --header 'x-header: maccosmo' --data '{"name": "donnieraycrisp"}' 'https://pool-app.herokuapp.com/activities/557c9737e97b8e50401230cb/invite' -v
```

Test Data
---------

Development
```
mongo pool --eval 'db.dropDatabase();'

node lib/test-data.js
```

Production
```
mongo -u pool -p xxxxxxxx ds036178.mongolab.com:36178/pool --eval 'db.dropDatabase();'

NODE_ENV=production node lib/test-data.js
```