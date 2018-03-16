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
  res.status(200).json({ message: '.' })    
  
})

app.get('/land', (req, res) => {
  client.land();
  res.status(200).json({ message: '.' })      
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

var upperLimit = 1;
var lowerLimit = 0;


app.get('/', routes.index);
app.get('/up/:upSpeed', (req, res) => {
  if (upSpeed <= upperLimit) {
    upSpeed += Number(req.params.upSpeed);
    client.up(upSpeed);
  }
  
  res.status(200).json({ message: '.' })
});

app.get('/down/:upSpeed', (req, res) => {
  if(upSpeed >= lowerLimit){
  upSpeed -= Number(req.params.upSpeed);
  
  client.down(upSpeed);
  }
  res.status(200).json({ message: '.' })
});

app.get('/clockwise/:speed',(req,res) => {
if(clockwiseSpeed <= upperLimit){
  clockwiseSpeed+=Number(req.params.speed);
  client.clockwise(clockwiseSpeed);
  }
  res.status(200).json({ message: '.' });
});

app.get('/counterClockwise/:speed',(req,res) => {
  if(clockwiseSpeed >= lowerLimit){
  clockwiseSpeed-=Number(req.params.speed);
  client.counterClockwise(clockwiseSpeed);
  }
  res.status(200).json({ message: '.' });

});

app.get('/front/:speed',(req,res) => {
  if(frontSpeed <= upperLimit){
  frontSpeed+=Number(req.params.speed);
  client.front(frontSpeed);
}
  res.status(200).json({ message: '.' });

});

app.get('/back/:speed',(req,res) => {
  if(frontSpeed >= lowerLimit){
  frontSpeed-=Number(req.params.speed);
  client.back(frontSpeed);
}
  res.status(200).json({ message: '.' });
});

app.get('/left/:speed',(req,res) => {
  if(leftSpeed <= upperLimit){
  leftSpeed+=Number(req.params.speed);
  client.left(leftSpeed);
}
  res.status(200).json({ message: '.' });
});

app.get('/right/:speed',(req,res) => {
  if(leftSpeed >= lowerLimit){
  leftSpeed-=Number(req.params.speed);
  client.right(leftSpeed);
}
  res.status(200).json({ message: '.' });
});

app.get('/stop',(req,res) => {
  client.stop();
  res.status(200).json({ message: '.' });
});

app.get('/camera/:id', (req, res) => {
  client.config('video:video_channel', Number(req.params.id))
  res.status(200).json({ message: '.' });
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
