/**
 * Created by lcom64_two on 1/23/2017.
 */

var express = require('express');
var app = express();
var router = express.Router();
var multer  = require('multer');
var upload = multer({ storage: storage }).any()

router.route('/images')

// create a stud (accessed at POST http://localhost:8080/api/studs)
app.post('/images', upload, function (req, res, next) {


        var product_img = req.body.pimg;  // set the bears name (comes from the request)

        // save the bear and check for errors
    product_img.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'table created!' + product_img});
        });
    })


    .get(function(req, res) {
        Img.find( function(err, imgs) {
            if (err)
                res.send(err);

            res.json(imgs);
        })
    });


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './model/imgtbl')
    },
    filename: function (req, file, cb) {
        cb(null, file.product_img + '-' + Date.now())
    }
})

// router.route('/studs/:sid')
//
// // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
//     .get(function(req, res) {
//         Stud.findById(req.params.sid, function(err, stud) {
//             if (err)
//                 res.send(err);
//             res.json(stud);
//         });
//     })


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);   //for eg /api/studs

var server = app.listen(80, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});