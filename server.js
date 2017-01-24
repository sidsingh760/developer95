/**
 * Created by lcom64_two on 1/24/2017.
 */

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var multer  = require('multer')
var morgan = require('morgan');
var Img = require('../model/imgtbl');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/mydb');     // connect to mongoDB database on modulus.io
app.use(express.static(__dirname));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));                                    // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var port = 8086;
app.set('port', port);

/* Disk Storage engine of multer gives you full control on storing files to disk. The options are destination (for determining which folder the file should be saved) and filename (name of the file inside the folder) */

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

/*Multer accepts a single file with the name photo. This file will be stored in request.file*/

var upload = multer({storage: storage}).any();

//Showing index.html file on our homepage
app.get('/', function(resuest, response) {
    response.sendFile('display.html');
});

//Posting the file upload
app.post('/upload', upload,function(request, response) {


    var img =  new Img();
    img.pname= request.body.pname;
    img.pimg= request.body.pimg;
    img.save(function (err,data) {
        response.json(data);

    })

});

var server = app.listen(port, function () {
    console.log('Listening on port ' + server.address().port)
});