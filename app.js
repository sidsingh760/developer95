/**
 * Created by admin on 1/19/2017.
 */
/**
 * Created by lcom64_two on 1/19/2017.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Emp = require('./model/emp');
var Dep = require('./model/dep');
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

module.exports = app;

router.route('/emps')

// create a stud (accessed at POST http://localhost:8080/api/studs)
    .post(function (req, res) {

        var emp = new Emp();
        // create a new instance of the stud model
        emp.eid = req.body.eid;  // set the bears name (comes from the request)
        emp.ename = req.body.ename;  // set the bears name (comes from the request)
        emp.did = req.body.did;  // set the bears name (comes from the request)

        emp.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'emp created!'});
        });
    })
    .get(function (req, res) {
        Emp.find().populate('did', 'dname').exec(function (err, emps) {
            if (err)
                res.send(err);

            res.json(emps);
        });
    })

// .get(function (req, res) {
//     Stud.findById(req.params.sid, function (err, stud) {
//         if (err)
//             res.send(err);
//         res.json(stud);
//     });
// })

router.route('/deps')

// create a dep (accessed at POST http://localhost:8080/api/studs)
    .post(function (req, res) {

        var dep = new Dep();      // create a new instance of the stud model
        dep.dname = req.body.dname;  // set the bears name (comes from the request)

        // save the bear and check for errors
        dep.save(function (err, data) {
            if (err)
                res.send(err);

            res.json(data);
        });
    })

    .get(function (req, res) {
        Dep.find(function (err, deps) {
            if (err)
                res.send(err);

            res.json(deps);
        });
    });


// router.route('/demps/:did')
// .get(function(req, res) {
//     Emp.findById(req.params.did, function(err, emp) {
//         if (err)
//             res.send(err);
//         res.json(emp);
//     });
// })


router.route('/emps/:eid')

    .delete(function (req, res) {
        Emp.remove({
            _id: req.params.eid
        }, function (err, emp) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });
router.route('/deps/:did')

    .delete(function (req, res) {
        Dep.remove({
            _id: req.params.did
        }, function (err, dep) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);   //for eg /api/studs

var server = app.listen(81, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});