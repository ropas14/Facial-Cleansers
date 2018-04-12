var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
Facials = require('./saveCleansers');

app.use(bodyParser.json());

app.get('/products', function(req, res) {		
   res.header("Access-Control-Allow-Origin", "*");  
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,'DELETE");  
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, sender, session, session_token, socket");
   Facials.getAllCleansers(function(err, facecleansers) {
      if (err) throw err;
      res.json(facecleansers);
   });
});

app.get('/products/:_id', function(req, res) {
   Facials.getCleansersById(req.params._id, function(err, facecleansers) {
      if (err) throw err;
      res.json(facecleansers);
   });
});

app.post('/products', function(req, res) {
   var facecleanser = req.body;
   Facials.addCleanser(facecleanser, function(err, facecleansers) {
      if (err) throw err;
      res.json(facecleansers);
   });
});

app.put('/products/:_id', function(req, res) {
   var id = req.params._id;
   var facecleanser = req.body;
   Facials.updateCleanser(id, facecleanser, {}, function(err, facecleanser) {
      if (err) throw err;
      res.json(facecleanser);
   });
});

app.delete('/products/:_id', function(req, res) {
   var id = req.params._id;
   Facials.removeCleanser(id, function(err, facecleanser) {
      if (err) throw err;
      res.json(facecleanser);
   });
});

app.listen(port);
console.log("Server is listening on port " + port);