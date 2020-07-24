var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Teste oc cli publish route!');
});

app.get('/teste', function (req, res) {
    res.send('Teste Node!!!');
  });

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});