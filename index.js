const gpio = require("onoff").Gpio;

// use GPIO pin numbers
var stepPins = [24,25,8,7];
var pinNumber = stepPins.length;
var pins = [];
var stepCounter = 0;
var timeout = 0.01;
var stepCount = 8;

// Setup the stepper motor sequence
Seq = [];
Seq[0] = [1,0,0,0];
Seq[1] = [1,1,0,0];
Seq[2] = [0,1,0,0];
Seq[3] = [0,1,1,0];
Seq[4] = [0,0,1,0];
Seq[5] = [0,0,1,1];
Seq[6] = [0,0,0,1];
Seq[7] = [1,0,0,1];

// Set pins to be outputs
for(var i=0; i<pinNumber; i++) {
    pins[i] = new gpio(stepPins[i], 'out');
}

// Drive the motor
var step = function() {
    for(var pin = 0; pin<4; pin++) {
        if(Seq[stepCounter][pin] != 0) {
            pins[pin].writeSync(1);
            } else {
            pins[pin].writeSync(0);
            }
    }
    stepCounter += 1
    if (stepCounter==stepCount){
        stepCounter = 0;
    }
    if (stepCounter<0){
        stepCounter = stepCount;
    }
    setTimeout( function(){step()}, timeout );
}

step();

/*
 Program Flow
 Loop
    Check feeding schedule
    if feeding time
        feed fish()
        log feeding - Time, initial weight, ending weight, amount fed
    end if
  end loop

  feed fish()
    Check weight to feed
    check feeder weight
    loop until delta = weight to feed
        step motor
        weight to feed = initial feeder weight - current feeder weight
    end loop
 */
