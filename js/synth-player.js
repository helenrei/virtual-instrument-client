let online = false;

// P5.js sound analyzer and synth (Oscillator)
// https://p5js.org/reference/#/p5.Oscillator
let fft, osc;

// P5.js synth setup (play with these values)
let attackTime = 0.001;
let decayTime = 0.9;
let susPercent = 0.3;
let releaseTime = 0.4;
let freq = 260;
let env;
let oscType = 'sine'; // 'sine', 'triangle', 'sawtooth', 'square'
let noteLength = 500;

// visualization parameters
let spectrum, energy, size;

// playing with keyboard
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  
  // keyboard number buttons change oscillator sound
  switch(keyName){
    case '1':
      oscType = "sine";
      break;
    case '2':
      oscType = "triangle";
      break;
    case '3':
      oscType = "sawtooth";
      break;
    case '4':
      oscType = "square";
      break;
  }

  if(online == false){
    switch (keyName) {
      case 'a':
        //freq = 100;
        playSynth(100);
        break;
      case 's':
        // freq = 200;
        playSynth(200);
        break;
      case 'd':
        // freq = 300;
        playSynth(300);
        break;
      case 'f':
        // freq = 400;
        playSynth(400);
        break;
      case 'g':
        // freq = 500;
        playSynth(500);
        break;
    }
  } else {
    switch (keyName) {
      case 'a':
        socket.emit("send-data", {"freq": 100, "type" : oscType} );
        break;
      case 's':
        socket.emit("send-data", {"freq": 200, "type" : oscType} );
        break;
      case 'd':
        socket.emit("send-data", {"freq": 300, "type" : oscType} );
        break;
      case 'f':
        socket.emit("send-data", {"freq": 400, "type" : oscType} );
        break;
      case 'g':
        socket.emit("send-data", {"freq": 500, "type" : oscType} );
        break;
      case 'h':
        socket.emit("send-data", {"freq": 600, "type" : oscType} );
        break;
    }
  }
  
});

// playing with click/touch
const keys = document.querySelectorAll(".key");

keys.forEach((key, idx) => {  
  key.addEventListener('click', () => {   
    socket.emit("send-data", { "freq": 100 + idx*100 } );
  });
});

function recieveData(data){
  playSynth(data);
}



// play synth
function playSynth(data){
  osc.freq(data.freq);
  osc.setType(data.type);
  osc.start();
  env.triggerAttack(osc);
  setTimeout(env.triggerRelease(osc), noteLength);
}


function setup() {
  createCanvas(windowWidth, windowHeight*0.8)
  
  // https://p5js.org/reference/#/p5.FFT
  fft = new p5.FFT();
  fft.smooth();

  osc = new p5.Oscillator(oscType);
  osc.amp(0);
  env = new p5.Envelope();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(1.0, 0.0);
}



// visualization
function draw() {
  blendMode(BLEND);
  background(10,5,20);
  blendMode(LIGHTEST);
  noFill();

  spectrum = fft.analyze(); 
  energy = fft.getEnergy(100, 255);
  size = map(energy, 0, 255, energy*0.2, windowHeight*0.8);

  stroke('hsla(0, 80%, 100%, 0.5)');
  strokeWeight(size*0.05);
  circle(windowWidth*0.5, windowHeight*0.4, size);
}


// helper functions
// allows browser to play sounds
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
// handles browser resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight*0.8, false);
}