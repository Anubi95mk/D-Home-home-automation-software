var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var http = require('http');
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
global.io = require('socket.io')(server);

var mosca = require('mosca');

var devices = require(__dirname + "/modules/device-loader");

global.allDevices= [];


mongoose.connect('mongodb://localhost/ManualAuth', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));


/* var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1883,
  backend: ascoltatore
};
var serverMQTT = new mosca.Server(settings); */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/views'));
app.use("/", express.static(__dirname + '/www'));
var index = require('./routes/index');
var devices = require('./routes/devices');
var dashboard = require('./routes/dashboard');
app.use('/', index);
app.use('/', devices);
app.use('/', dashboard);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});




// listen on port 3000
function start(){
global.mainServer = server.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
}
start();

//io socket
io.on('connection', function (client) {



  client.on('messages', function (data) {
    console.log(data);
  });

  client.on('getDevice', function (data) {
    
    client.emit('devices', allDevices );
  });

  client.on('devicesUpdate', function (data) {
    client.emit('devicesUpdate', allDevices );
  });
});


////
/* serverMQTT.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a message is received
serverMQTT.on('published', function(packet, client) {
console.log('Published', packet.payload);
});

serverMQTT.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
console.log('MQTT server is up and running');
} */