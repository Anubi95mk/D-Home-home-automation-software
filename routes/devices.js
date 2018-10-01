
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Device = require('../models/devices');
var Log = require('../models/log');
const path = require('path');
var devices = require(path.join(__dirname, "../", "modules/device-loader"));
var mongoose = require('mongoose');
const request = require('request');



var checkSession = function (req, res, next) {

	if (req.session.userId) {
		next();
	}
	else {
		res.send({ error: true, msg: "must be logged" });
	}



}






router.get('/discovery', checkSession, function (req, res, next) {
	var toSend = [];
	var promises = [];

	devices.list.forEach(function (element) {
		promises.push(element.discovery());
	});
	Promise.all(promises).then(function (data) {
		//res.send(data);
		return res.render('discovery.ejs', { "esk": "", "sonoff": data });
	})

});

router.get('/discovery/:device', checkSession, function (req, res, next) {

	var toSend = [];
	var promises = [];
	var exist = false;
	var moduleFound;
	devices.list.forEach(function (element) {
		if (element.identity == req.params.device) {
			moduleFound = element;
			exist = true;
		}
	});
	if (!exist) res.send(req.params.device, "module dosn't exist");
	else {

		promises.push(moduleFound.discovery());

		Promise.all(promises).then(function (data) {
			res.send(data);
		})
	}

});

router.get('/devices/:id', function (req, res, next) {

	Device.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, function (err, dev) {
		if (dev) {

			res.send(dev);

		}
		else {
			res.send(err);
		}

	});

});

router.post('/device/power', function (req, res) {
	var idDevice = req.body.id;
	var promises = [];
	Device.find({ _id: mongoose.Types.ObjectId(req.body.id) }, function (err, data) {


		promises.push(devices.list[0].getState(data[0]));

		Promise.all(promises).then(function (data) {
			res.send(data);
		})

	});

});


router.post('/device/actions', function (req, res) {

	var idDevice = req.body.id;
	var funcDevice = req.body.func;
	var state = req.body.state;
	Device.findOne({ _id: mongoose.Types.ObjectId(idDevice) }, function (err, dev) {

		if (dev) {
			var mod = dev.type;
			var modLoaded = null;
			devices.list.forEach(function (element) {

				if (element.identity == mod) {
					modLoaded = element;

				}

			});
			if (modLoaded) {
				if (modLoaded[funcDevice]) {
					
					modLoaded[funcDevice](dev);
					

					res.send({ err: false, msg: "Funcion execute" });
				}
				else { res.send({ err: true, msg: "Funcion not found" }); }
			}
			else {
				res.send({ err: true, msg: "Module not found" });
			}
		}
		else {
			res.send({ err: true, msg: "Device not found" });
		}

	});


});




router.get('/devices', checkSession, function (req, res, next) {

	var promises = [];
	Device.find({}, function (err, data) {

		data.forEach(function (dbDevice) {

			devices.list.forEach(function (element) {
				if (element.identity == dbDevice.type) {
					promises.push(element.checkAvaiability(dbDevice));
				}

			});


		})
		Promise.all(promises).then(function (data) {
			allDevices = data;
			res.send(data);
		})

	});
	//	return res.render('devices-registration.ejs');
});


router.get('/devicesAll', checkSession, function (req, res, next) {

	var promises = [];
	Device.find({}, function (err, data) {


		res.send(data);
	});


	//	return res.render('devices-registration.ejs');
});


router.post('/devices', checkSession, function (req, res, next) {

	var devInfo = req.body;

	Device.findOne({ mac: devInfo.mac }, function (err, data) {
		if (!data) {

			var newDev = new Device({
				ip: devInfo.ip,
				mac: devInfo.mac,
				devname: devInfo.devname,
				type: devInfo.type,
				status: "",
				info: null


			});

			newDev.save(function (err, Device) {
				if (err) {
					res.send({ error: true, msg: "Erron on saving the device" });
				}
				else {
					res.send({ error: false, msg: "Device saved" });
				}
			});

			//res.send({ "Success": "You have succefully added the device" });

		} else {
			res.send({ error: true, msg: "Device alredy exists" });
		}

	});


});

router.post('/log',function (req, res, next) {
   console.log(req.body.id);
   console.log(req.body.func);
	var newLog = new Log({
		idDevice: req.body.id,
		operation: req.body.func,
		devname: req.body.devname,
		
		


	});

	newLog.save(function (err, Log) {
		if (err) {
			res.send({ error: true, msg: "Erron on saving the log" });
		}
		else {
			res.send({ error: false, msg: "Log saved" });
		}
	});

});

router.get('/log',function (req, res, next) {
	
	Log.find({}, function (err, data) {


		res.send(data);
	}).sort({_id:-1});
 });




module.exports = router;