
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Dashboard = require('../models/dashboard');
const path = require('path');
var devices = require(path.join(__dirname, "../", "modules/device-loader"));

var multer = require('multer');

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./img");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});


var upload = multer({
    storage: Storage
}).array("imgUploader", 3); //Field name and max count


var checkSession = function (req, res, next) {

    if (req.session.userId) {
        next();
    }
    else {
        res.send({ error: true, msg: "must be logged" });
    }



}



router.get('/dashboard', function (req, res, next) {


    Dashboard.findOne({}, function (err, data) {


        res.send(data);


    });

});
router.get('/dashboardAll', function (req, res, next) {


    Dashboard.find({}, function (err, data) {


        res.send(data);


    });

});

router.get('/dashboard/:id', function (req, res, next) {


    Dashboard.findOne({ _id: req.params.id }, function (err, data) {


        res.send(data);


    });
    //	return res.render('devices-registration.ejs');
});

router.get('/dashboards', function (req, res, next) {


    Dashboard.find({}, function (err, data) {


        res.send(data);


    });
    //	return res.render('devices-registration.ejs');
});


router.post('/dashboardAdd', function (req, res, next) {

    var dashInfo = req.body;
    Dashboard.findOne({ _id: dashInfo._id }, function (err, data) {
        if (!data) {

            var newDash = new Dashboard({

                dashboardName: "dashboardName",
                objects: [{
                    x: 11,
                    y: 11,
                }]
            });
            newDash.save(function (err, Dashboard) {
                if (err) {
                    res.send({ error: true, msg: "Erron on saving the dashboard", info: err });
                }
                else {
                    res.send({ error: false, msg: "Dashboard saved" });
                }
            });

            // res.send({ "Success": "You have succefully added the Dashboard" });

        }
    });

});


router.post('/dashboardUpdate', function (req, res, next) {

    var dashInfo = req.body;
    var img = dashInfo.image;
    var id = dashInfo.id;
    var objects = [];
    object = JSON.parse(dashInfo.element)
    Object.keys(object).forEach(key => {
        objects = (object[key]);
    });

    Dashboard.findOneAndUpdate({ _id: id },
        {
            $set: {
                dashboardName: dashInfo.name,
                objects: objects,
                image: img

            }
        },
        { new: true },
        function (err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
                res.send({ error: true, msg: "Erron on saving the dashboard", info: err });
            }
            else {

                res.send({ error: false, data: doc });
            }
        });

});

router.post('/dashboardRemove', function (req, res, next) {

    var dashInfo = req.body;
    var id = dashInfo.id;
    Dashboard.deleteOne({ _id: id }, function (err, data) {


    });

});





router.post('/dashboard', function (req, res, next) {

    var dashInfo = req.body;

    Dashboard.findOne({ _id: dashInfo._id }, function (err, data) {
        if (!data) {

            var newDash = new Dashboard({

                dashboardName: "Casa",
                objects: [
                    {

                    }
                ],
                image: "blabla"
            });

            newDash.save(function (err, Dashboard) {
                if (err) {
                    res.send({ error: true, msg: "Erron on saving the dashboard" });
                }
                else {
                    res.send({ error: false, msg: "Dashboard saved" });
                }
            });

        } else {

            res.send({ error: true, msg: "Device alredy exists" });
        }

    });


});
var formidable = require('formidable');


router.post('/img', function (req, res) {
    var form = new formidable.IncomingForm();
  
    form.parse(req);

    form.on('fileBegin', function (name, file) {


        let reqPath = path.join(__dirname, '../');
        file.path = + reqPath + '/../www/admin/assets/img/src/' + file.name;
        console.log(file.path);
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    });
    //res.end();
});

module.exports = router;