/**
 * Created by lcom64_two on 1/23/2017.
 */
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Img = require('./model/imgtbl');
var router = express.Router();
var multer  = require('multer');

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: false }));
app.use(cookieParser());


var fn='';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './product_img')
    },
    filename: function (req, file, cb) {
        fn=file.product_img + '-' + Date.now();
        cb(null, fn)
    }
});
var upload = multer({ storage: storage }).any()

router.route('/images')

// create a stud (accessed at POST http://localhost:8080/api/studs)

    .post(upload, function (req, res) {
        var img = new Img();      // create a new instance of the stud model
        img.product_name = req.body.pname;  // set the bears name (comes from the request)
        img.product_img = fn;  // set the bears name (comes from the request)

        // save the bear and check for errors
        img.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'table created!' });
        });
    })


    .get(function(req, res) {
        Img.find( function(err, imgs) {
            if (err)
                res.send(err);

            res.json(imgs);
        })
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);   //for eg /api/studs

var server = app.listen(81, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});