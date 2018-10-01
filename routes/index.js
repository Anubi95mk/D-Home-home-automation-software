





var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Device = require('../models/devices');
const path = require('path');

var app = express();
var http = require('http');
var server = require('http').Server(app);

var devices = require(path.join(__dirname, "../", "modules/device-loader"));
//////////////
// WIFII///////
//const scanner = require('node-wifi-scanner');
const request = require('request');
var arp = require('node-arp');
const dns = require('dns');
const arpScanner = require('arpscan');
browser = require('iotdb-arp');

var network = require('network');

/////////


router.get('/', function (req, res, next) {
	console.log("profile");

	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		//	console.log("data");
		//	console.log(data);
		if (!data) {
			return res.render('registration.ejs');

		} else {
			res.redirect('/profile');
		}
	});



	//return res.render('index.ejs');
});


router.post('/registration', function (req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, function (err, data) {
				if (!data) {
					var c;
					User.findOne({}, function (err, data) {

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						var newPerson = new User({
							unique_id: c,
							email: personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function (err, Person) {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "Success!" });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.post('/deviceRegistration', function (req, res, next) {
	console.log(req.body);
	var deviceInfo = req.body;


	if (!deviceInfo.ip || !deviceInfo.mac || !deviceInfo.devname) {
		res.send();
	} else {
		

			Device.findOne({ mac: deviceInfo.mac }, function (err, data) {
				if (!data) {
					var c;
					Device.findOne({}, function (err, data) {

						

						var newDevice = new User({
							
							ip: deviceInfo.ip,
							mac: deviceInfo.mac,
							devname: deviceInfo.devname,
							
						});

						newDevice.save(function (err, Person) {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Device is already present." });
				}

			});
		
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		if (data) {

			if (data.password == req.body.password) {
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				req.session.userEmail = data.email;
				//console.log(req.session.userId);
				res.send({ "Success": "Success!" });

			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		Device.find({ owner: req.session.userEmail }, function (err, dev) {
			var l = 0;
			var name = [];
			//	console.log("dev");
			dev.forEach(function (element) {
				l++;
				name[l] = dev[l - 1].devname;
				//console.log(name[l]);
			});
			//	console.log(l);
			if (!data) {
				res.redirect('/');
			} else {
				//console.log("found");
				req.session.views++;

				//console.log(req.session.views);
				res.locals.req = req;
				res.locals.res = res;
				var name = [];
				name = dev;

				if (l == 0) {
					console.log("non ci sono devices ");
					name = "No device";
				}
				else {
					name = dev;
				}
	
				return res.render('data.ejs', { "name": data.username, "email": data.email, "devname": name, "lenght": l });

			}
		});
	});
});



router.get('/modules', function (req, res, next) {

	var toSend = [];
	devices.list.forEach(function (element) {
		toSend.push(element);
	});

	res.send(toSend);
});


router.get('/discovery', function (req, res, next) {
	var toSend = [];
	var promises = [];
	
	devices.list.forEach(function (element) {
		promises.push(element.discovery());
		toSend.push(element);
	});
	Promise.all(promises).then(function (data) {
		//res.send(data);
		//return res.render('discovery.ejs', { "esk": "c", "sonoff": data });
		res.send(data);
	})

});

router.get('/discovery/:device', function (req, res, next) {

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
router.get('/loading', function (req, res, next) {
	//return res.render('discovery.ejs', {"esk":founded_h , "sonoff" :sonoff});
});



router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});
router.get('/users', function (req, res, next) {
	console.log("Users")
	User.find({ }, function (err, data) {
		console.log(data);
		res.send(data);

	});
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		console.log(data);
		if (!data) {
			res.send({ "Success": "This Email Is not regestered!" });
		} else {
			// res.send({"Success":"Success!"});
			if (req.body.password == req.body.passwordConf) {
				data.password = req.body.password;
				data.passwordConf = req.body.passwordConf;

				data.save(function (err, Person) {
					if (err)
						console.log(err);
					else
						console.log('Success');
					res.send({ "Success": "Password changed!" });
				});
			} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}
		}
	});

});



router.post('/settings', function (req, res, next) {
	var settings = req.body;
	var port = req.body.localPort


	mainServer.close();
	console.log("chiuso");
start();
});




module.exports = router;