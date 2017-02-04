/**
 * Created by lcom64_two on 1/25/2017.
 */
var express  = require('express');
var app      = express();
var Stud = require('./model/stud');
var State = require('./model/state');
var City = require('./model/city');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var cors=require('cors');
var multer  = require('multer')
mongoose.connect('mongodb://localhost:27017/mydb');     // connect to mongoDB database on modulus.io
app.use(express.static(__dirname + '/public'));         // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'}));                                     // parse application/json
app.use(bodyParser.json({limit: '50mb'},{ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cors());
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads');
    },
    filename: function (request, file, callback) {
        console.log("file:"+file.originalname);
        var filename=file.originalname;
        request.body.pimg =filename;
        callback(null, file.originalname);
    }
});

var upload = multer({storage: storage}).any('pimg');

app.get('/studs/:to_id', function(req, res) {
    Stud.findById(req.params.to_id,function(err, studs) {
        if (err)
            res.send(err)
        res.json(studs); // return all todos in JSON format
    });
});
app.post('/state', function(req, res) {
    console.log(req.body.sname);
    State.create({
        // name : req.body.name,
        // email : req.body.email,
        // state : req.body.state,
        // city : req.body.city,
        // gender : req.body.gender,
        // date : req.body.date,
        // pimg: req.body.pimg
        sname : req.body.sname
    }, function(err, todo) {
        if (err)
            res.send(err);
        State.find(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
        });
    });
});

app.get('/studs', function(req, res) {
    Stud.find(function(err, studs) {
        if (err)
            res.send(err)
        res.json(studs); // return all todos in JSON format
    });
});
app.get('/state', function(req, res) {
    State.find(function(err, states) {
        if (err)
            res.send(err)
        res.json(states);
        //res.json(JSON.stringify(states));
    });
});
app.get('/city/:id', function(req, res) {
    City.find({ sid: {$eq: req.params.id}}).exec(function(err, cities) {
        if (err)
            res.send(err)
        res.json(cities);
    });
});
app.put('/studs/:to_id',function(req, res) {
    Stud.findById(req.params.to_id, function (err, studs) {
        if (err)
            res.send(err);
        studs.name = req.body.name;
        studs.email = req.body.email;
        studs.state = req.body.state;
        studs.city = req.body.city;
        studs.gender = req.body.gender;
        studs.date = req.body.date;
        studs.save();
        Stud.find(function (err, products) {
            if (err)
                res.send(err)
            res.json(products);
        });
    });
})
app.delete('/studs/:id', function(req, res) {
    Stud.remove({
        _id : req.params.id
    }, function(err, todo) {
        if (err)
            res.send(err);
        // get and return all the todos after you create another
        Stud.find(function(err, stud) {
            if (err)
                res.send(err)
            res.json(stud);
        });
    });
});

app.post('/studs',upload, function(req, res) {
    console.log(req.body.name);
    Stud.create({
        // name : req.body.name,
        // email : req.body.email,
        // state : req.body.state,
        // city : req.body.city,
        // gender : req.body.gender,
        // date : req.body.date,
        // pimg: req.body.pimg

        name : req.body.name,
        email : req.body.email,
        dob :req.body.dob,
        state : req.body.state,
        city : req.body.city,
        gender : req.body.gender,
        active :req.body.active,
        pimg: req.body.pimg

    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Stud.find(function(err, studs) {
            if (err)
                res.send(err)
            res.json(studs);
        });
    });
});
var server = app.listen(8086, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});