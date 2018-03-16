var express = require('express')
  , routes = require('./routes')
  , app = express()
  , path = require('path')
  , server = require("http").createServer(app)
  ;

var upSpeed = 0;
var leftSpeed=0;
var frontSpeed=0;
var clockwiseSpeed=0;

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade', { pretty: true });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

var arDrone = require('ar-drone');
var client  = arDrone.createClient();

app.configure('development', function () {
    app.use(express.errorHandler());
    app.locals.pretty = true;
});
app.get('/takeoff', (req, res) => {
  client.takeoff()
})

app.get('/land', (req, res) => {
  client.land()
})


app.get('/', routes.index);
app.get('/up/:upSpeed', (req, res) => {
  upSpeed += req.params.upSpeed
  client.up(upSpeed)
  res.status(200)
});

app.get('/down/:upSpeed', (req, res) => {
  upSpeed -= req.params.upSpeed
  client.down(upSpeed)
  res.status(200)
});

app.get('/clockwise/:speed',(req,res) => {
  clockwiseSpeed+=req.params.speed;
  client.clockwise(clockwiseSpeed);
  res.status(200);
});

app.get('/counterClockwise/:speed',(req,res) => {
  clockwiseSpeed-=req.params.speed;
  client.counterClockwise(counterClockwise);
  res.status(200);

});

app.get('/front/:speed',(req,res) => {
  frontSpeed+=req.params.speed;
  client.front(frontSpeed);
  res.status(200);

});
app.get('/back/:speed',(req,res) => {
  frontSpeed-=req.params.speed;
  client.back(frontSpeed);
  res.status(200);

});

app.get('/left/:speed',(req,res) => {
  leftSpeed+=req.params.speed;
  client.left(leftSpeed);
  res.status(200);

});
app.get('/right/:speed',(req,res) => {
  leftSpeed-=req.params.speed;
  client.right(leftSpeed);
  res.status(200);

});
app.get('/calibrate',(req,res) => {
  client.calibrate(0);
  res.status(200);

});

/*
 * Important:
 *
 * pass in the server object to listen, not the express app
 * call 'listen' on the server, not the express app
 */
// should be require("dronestream").listen(server);
require("../../index").listen(server);
server.listen(3000);
