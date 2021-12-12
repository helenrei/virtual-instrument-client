# virtual-instrument-client (synth)

Simple multi-player synth example. 

Uses:
- [p5](https://p5js.org/) and [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) for playing sounds and visualisation
- [Socket.io](https://socket.io/) for communication between server and clients 

## Listen
Listens to Socket.io server (default http://localhost:8000, may be changed based on your server setup).

When a signal comes from the server, generates a sound with [p5.Oscillator](https://p5js.org/reference/#/p5.Oscillator). 

## Play
You can also send a signal to the server from the client.

Keyboard: ```A, S, D, F, G, H``` keys or  
Click/touch: ```A, S, D, F, G, H``` buttons on the screen.

Keyboard buttons ```1-4``` change the sound shape between ```'sine', 'triangle', 'sawtooth',  'square'```.

## Visualisation
Displays a simple visualization 

## Installation

No extra steps needed, just run it in some http server.