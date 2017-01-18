// Modules
var express = require('express');
var bodyParser = require('body-parser');

// END modules

var app = express();
var server = require('http').Server(app);
var sql = require('./my_index.js');


//middleware
app.use(bodyParser.json());

//end middleware
// define routes

//show
app.get('/',function (req,res,next) {

    sql.executeSql("SELECT * FROM user", function (err, data) {
      if(err){
          return res.send({error: err});
      }
      return res.send({data: data});
    })
});

app.post('/login', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    res.send({message: 'welcome, ' + req.body.uname})
});


//insert
app.post('/addusers', function(req, res) {
  console.log('inserted...',req.params.uname);
    sql.executeSql("insert into user(uname,salary) values ('"+ req.body.uname +"',"+ req.body.salary +")"  , function (err, data) {
        if(err){
            return res.send({error: err});
        }
        return res.send({data: data});
    })
});


//update
app.put('/upusers/:uid', function(req, res) {
    sql.executeSql("update user set uname='"+req.body.uname+"' where uid="+ req.params.uid +"", function (err, data) {
        if(err){
            return res.send({error: err});
        }
        return res.send({data: data});
    })
});


//delete
app.delete('/delusers/:uid', function(req, res) {
  console.log('-----------', req.params.uid);
    sql.executeSql("delete from user where uid="+ req.params.uid +"", function (err, data) {
        if(err){
            return res.send({error: err});
        }
        return res.send({data: data});
    })
});


//end routes
server.listen(8980, function (err) {
    if(err){
        console.log('err: ', err);
    } else {
        console.log('Server started');
    }
});
