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
  client.takeoff();
  console.log("Hey");
})

app.get('/land', (req, res) => {
  client.land();
  console.log("Hey");
})

/*
function executeDroneFunction(func){
  switch(func){
    case 1: client.left(10);
      break;
    case 2: client.up(10);
      break;
    case 3: client.right(10);
      break;
    case 4: client.down(10);
      break;
    case 5: client.counterClockwise(10);
      break;
    case 6: client.leftSpeed(10);
      break;
    case 7: client.leftSpeed(10);
      break;
    case 8: client.leftSpeed(10);
      break;
    case 9: client.leftSpeed(10);
      break;
    case 10: client.leftSpeed(10);
      break;
  }
}
socket_streamer.on('access_server',executeDroneFunction);



/**/
app.get('/', routes.index);
app.get('/up/:upSpeed', (req, res) => {
  upSpeed += Number(req.params.upSpeed);
  client.up(upSpeed);
  console.log("Hey");
  res.status(200)
});

app.get('/down/:upSpeed', (req, res) => {
  upSpeed -= Number(req.params.upSpeed);
  console.log("Hey");
  client.down(upSpeed);
  res.status(200)
});

app.get('/clockwise/:speed',(req,res) => {
  clockwiseSpeed+=Number(req.params.speed);
  client.clockwise(clockwiseSpeed);
  console.log("Hey");
  res.status(200);
});

app.get('/counterClockwise/:speed',(req,res) => {
  clockwiseSpeed-=Number(req.params.speed);
  client.counterClockwise(counterClockwise);
  console.log("Hey");
  res.status(200);

});

app.get('/front/:speed',(req,res) => {
  frontSpeed+=Number(req.params.speed);
  client.front(frontSpeed);
  console.log("maurya");
  res.status(200);

});

app.get('/back/:speed',(req,res) => {
  frontSpeed-=Number(req.params.speed);
  client.back(frontSpeed);
  console.log("maurya");
  res.status(200);
});

app.get('/left/:speed',(req,res) => {
  leftSpeed+=Number(req.params.speed);
  client.left(leftSpeed);
  console.log("maurya");
  res.status(200);

});
app.get('/right/:speed',(req,res) => {
  leftSpeed-=Number(req.params.speed);
  client.right(leftSpeed);
  console.log("maurya");
  res.status(200);

});
app.get('/stop',(req,res) => {
  client.stop();
  res.status(200);
  console.log("maurya");
});

app.get('/camera/:id', (req, res) => {
  client.config('video:video_channel', req.params.id)
  res.status(200);
})

app.get('/controller', (req, res) => {
  res.sendfile(__dirname + '/views/controller.html')
})

/*
 * Important:
 *
 * pass in the server object to listen, not the express app
 * call 'listen' on the server, not the express app
 */
// should be require("dronestream").listen(server);
require("../../index").listen(server);
server.listen(3000);
