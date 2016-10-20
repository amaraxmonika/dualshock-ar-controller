var dualShock = require('dualshock-controller');
var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();
var MAX = 255 / 2;
var MAGNITUDE = 1;
var ROLL_MAG = 1;
var PITCH_MAG = 1;
var YAW_MAG = 1;
var SPEED_MAG = 1;
var isAirborne = false;
var ref = {};
    ref.emergency = false;
var pcmd = {};

//pass options to init the controller.
var controller = dualShock(
    {
        config: "dualshock4-generic-driver",
        accelerometerSmoothing : false,
        analogStickSmoothing : true
    });

controller.on('error', function(data) {
  console.log('there was an error:');
  config.dir(data);
});

// takeoff/landing *************************
controller.on('triangle:press', function (data) {
    ref.fly = true;
    pcmd = {};
});

controller.on('square:press', function (data) {
    ref.fly = false;
    pcmd = {};
});
controller.on('circle:press', function (data) {
    ref.emergency = false;
});

// rates config ****************************
controller.on('dpadDown:press', function (data) {
    console.log('down');
});
controller.on('dpadUp:press', function (data) {
    console.log('up');
});
controller.on('dpadLeft:press', function (data) {
    console.log('left');
});
controller.on('dpadRight:press', function (data) {
    console.log('right');
});
controller.on('l1:press', function (data) {
    if (MAGNITUDE > 1)
        MAGNITUDE -= 1
    console.log('l1 pressed, MAGNITUDE:' + MAGNITUDE);
});
controller.on('r1:press', function (data) {
    if (MAGNITUDE < 5)
        MAGNITUDE += 1
    console.log('r1 pressed, MAGNITUDE:' + MAGNITUDE);
});

// movements! ********************************
controller.on('left:move', function(data) {
  var delta_y = (MAX - data.y)/MAX;
  var delta_x = (MAX - data.x)/MAX;
  pcmd.up = (delta_y / MAGNITUDE).toFixed(1);
  pcmd.counterClockwise = (delta_x / MAGNITUDE).toFixed(1);
  
});
controller.on('right:move', function(data) {
  var delta_y = (MAX - data.y)/MAX;
  var delta_x = (MAX - data.x)/MAX;
  pcmd.left = (delta_x / MAGNITUDE).toFixed(1);
  pcmd.front =(delta_y / MAGNITUDE).toFixed(1);
});

// send interval
setInterval(function() {
  control.ref(ref);
  control.pcmd(pcmd);
  control.flush();
  console.dir(pcmd);
}, 30);
