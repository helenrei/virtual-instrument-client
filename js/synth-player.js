
// P5.js sound analyzer and synth
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

  switch (keyName) {
    case 'a':
      freq = 100;
      playSynth();
      break;
    case 's':
      freq = 200;
      playSynth();
      break;
    case 'd':
      freq = 300;
      playSynth();
      break;
    case 'f':
      freq = 400;
      playSynth();
      break;
    case 'g':
      freq = 500;
      playSynth();
      break;
  }
  
});



// play synth
function playSynth(s){
  osc.freq(freq);
  osc.start();
  env.triggerAttack(osc);
  setTimeout(env.triggerRelease(osc), noteLength);
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  
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
  size = map(energy, 0, 255, energy*0.2, windowHeight);

  stroke('hsla(0, 80%, 100%, 0.5)');
  strokeWeight(size*0.05);
  circle(windowWidth*0.5, windowHeight*0.5, size);
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
  resizeCanvas(windowWidth, windowHeight, false);
}