const bodyParser = require('body-parser');
var express = require("express");

var app = express();
app.use(bodyParser.json());

const controller = require('./controller')

app.get('/balance', function(req, res){
    controller.balance(req, res);
});

app.post('/event', function(req,res){
    controller.event(req,res);
});

app.post('/reset', function(req,res){
    controller.reset(res);
});

app.listen(3000, () => { console.log('ok'); });
