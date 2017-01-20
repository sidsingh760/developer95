/**
 * Created by lcom64_two on 1/19/2017.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Stud = require('./model/stud');
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;

router.route('/studs')

// create a stud (accessed at POST http://localhost:8080/api/studs)
    .post(function(req, res) {

        var stud = new Stud();      // create a new instance of the stud model
        stud.name = req.body.name;  // set the bears name (comes from the request)
        stud.marks = req.body.marks;  // set the bears name (comes from the request)

        // save the bear and check for errors
        stud.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
    })

    .get(function(req, res) {
        Stud.find(function(err, studs) {
            if (err)
                res.send(err);

            res.json(studs);
        });
    });

router.route('/studs/:sid')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Stud.findById(req.params.sid, function(err, stud) {
            if (err)
                res.send(err);
            res.json(stud);
        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Stud.findById(req.params.sid, function(err, stud) {

            if (err)
                res.send(err);

            stud.name = req.body.name;  // update the bears info
            stud.marks = req.body.marks;  // update the bears info


            // save the bear
            stud.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })

    .delete(function(req, res) {
        Stud.remove({
            _id: req.params.sid
        }, function(err, stud) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);   //for eg /api/studs

var server = app.listen(8090, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});