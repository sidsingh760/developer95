var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({parameterLimit: 1000000 ,limit:'50mb', extended: false }));
app.use(cookieParser());

var router = express.Router();
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './product_img');
    },
    filename: function (req, file, cb) {
        console.log("----");
        var filename = Date.now() + file.originalname;
        req.body.productImage = filename;
        cb(null,filename);
    }
})

var upload = multer({ storage: storage }).any();


router.route('/product')
    .get( function (req, res) {
        console.log("Inside get");
        res.send("Called");
    })

    .post(upload, function (req, res) {
        console.log("Inside post");
        res.send("Called");
    });

app.use('/', router);
app.listen(83);


