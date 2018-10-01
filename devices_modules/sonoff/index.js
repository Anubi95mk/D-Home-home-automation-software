




var evilscan = require('evilscan');
var os = require('os');
const request = require('request');
var arp = require('node-arp');


var device = {};
/*STANDARDS*/
device.name = "Sonoff";
device.identity = "Sonoff";
device.description = "Presa wifii";
device.moduleVersion = "1.0.0";
device.functions = ["powerOn", "powerOff", "toggle"];
device.state = 0;
/*STANDARDS*/




device.discovery = function () {

    var myIp;
    var founded_host;
    var networkInterfaces = os.networkInterfaces();
    var founded = [];
    var done = false;


    return new Promise(function (resolve, reject) {
        var subPromises = [];

        Object.keys(networkInterfaces).forEach(function (interface) {
            networkInterfaces[interface].forEach(function (protocol) {

                if (!protocol.internal && protocol.cidr != null && protocol.family == "IPv4") {

                    var options = {
                        target: protocol.cidr,
                        port: '80',
                        status: 'O', // Timeout, Refused, Open, Unreachable
                        banner: true
                    };
                    //console.log("Scannerizzando " , interface, protocol.family);
                    subPromises.push(new Promise(function (subResolve, subReject) {
                        var scanner = new evilscan(options);
                        scanner.on('result', function (data) {

                            arp.getMAC(data.ip, function (err, mac) {
                                if (!err) {
                                    data.mac = mac;
                                    var command = "http://" + data.ip + "/cm?cmnd=Status";
                                    request(command, { json: true }, (err, res, body) => {
                                        if (err) { return console.log(err); }
                                        if (body) {
                                            if (body.Status && body.Status.Topic && body.Status.Topic.indexOf("sonoff") > -1) {
                                                data.info = body.Status;
                                                data.type = device.name;
                                                founded.push(data);

                                            }
                                        }
                                    });
                                }
                            });
                        });
                        scanner.on('error', function (err) {
                            subReject(err);
                        });
                        scanner.on('done', function () {
                            subResolve(founded);
                            console.log("fine scan", interface, protocol.family);
                        });
                        scanner.run();
                    }))

                }

            })

        })
        Promise.all(subPromises).then(function (data) {
            console.log("Fine dyscovery");
            resolve(founded);
        })
    })


}

device.checkAvaiability = function (dev) {


    return new Promise(function (resolve, reject) {
        if (dev.ip) {
            var command = "http://" + dev.ip + "/cm?cmnd=Status";
            request(command, { json: true }, (err, res, body) => {
                //console.log("http://" + dev.ip + "/cm?cmnd=Status");


                if (err) {
                    dev.status = "offline";
                    dev.state = 0;


                    resolve(dev);
                }
                else if (body && body.Status && body.Status.Topic && body.Status.Topic.indexOf("sonoff") > -1) {
                    //console.log(body.Status);
                    dev.status = "online";
                    dev.info = body.Status;
                    dev.state = body.Status.Power;


                    resolve(dev);

                }
            });
        }
        else {


            dev.status = "offline";
            dev.state = 0;
            resolve(dev);
        }
    });


}



/*FUNCTIONALITIES*/

device.toggle = function (device) {



    var index = allDevices.findIndex(function (value) { return value._id = device._id; });

    if (allDevices[index].state == 1) allDevices[index].state = 0;
    else allDevices[index].state = 1;

    console.log(allDevices[index].state);


    io.emit('devicesUpdate', { "ip": device.ip, "id": device.id, "state": allDevices[index].state });

    request({
        url: 'http://' + device.ip + '/cm?cmnd=Power%20TOGGLE',
        method: "POST",
        json: true,   // <--Very important!!!
        body: ""
    }, function (error, response, body) {
        // console.log(response);
    });

}
device.powerOn = function (device) {


    var index = allDevices.findIndex(function (value) { return value._id = device._id; });
    allDevices[index].state = 1;
    io.emit('devicesUpdate', { "ip": device.ip, "id": device.id, "state": allDevices[index].state });

    request({
        url: 'http://' + device.ip + '/cm?cmnd=Power%20On',
        method: "POST",
        json: true,   // <--Very important!!!
        body: ""
    }, function (error, response, body) {
        //  console.log(response);
    });

}
device.powerOff = function (device) {

    var index = allDevices.findIndex(function (value) { return value._id = device._id; });
    allDevices[index].state = 0;
    io.emit('devicesUpdate', { "ip": device.ip, "id": device.id, "state": allDevices[index].state });
    request({
        url: 'http://' + device.ip + '/cm?cmnd=Power%20Off',
        method: "POST",
        json: true,   // <--Very important!!!
        body: ""
    }, function (error, response, body) {
        //  console.log(response);
    });

}


device.getState = function (device) {

}

module.exports = device;