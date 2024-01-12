let x = 0.01;
let y = 0;
let z = 0;

let a = 10;
let b = 28;
let c = 8.0 / 3.0;

let points = new Array();
let monoSynth;
let osc1, osc2, osc3;
let playing, freq, amp;

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

function setup() {

    osc1 = new p5.Oscillator('sine');
    osc2 = new p5.Oscillator('triangle');
    osc3 = new p5.Oscillator('square');
    //monoSynth = new p5.MonoSynth();

    let cnv = createCanvas(600, 800, WEBGL);
    cnv.mousePressed(startAudio());
    colorMode(HSB);

}

function draw() {
    background(0);

    let dt = 0.01;
    let dx = (a * (y - x)) * dt;
    let dy = (x * (b - z) - y) * dt;
    let dz = (x * y - c * z) * dt;
    x = x + dx;
    y = y + dy;
    z = z + dz;

    points.push(new p5.Vector(x, y, z));
    playSynth(x, y, z);

    translate(0, 0, -80);
    let camX = map(mouseX, 0, width, -200, 200);
    let camY = map(mouseY, 0, height, -200, 200);
    camera(camX, camY, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    //translate(width/2, height/2);
    scale(5);
    stroke(255);
    noFill();

    let hu = 0;
    beginShape();

    for (let v of points) {
        stroke(hu, 255, 255);
        vertex(v.x, v.y, v.z);
        //PVector offset = PVector.random3D();
        //offset.mult(0.1);
        //v.add(offset);

        hu += 1;
        if (hu > 255) {
            hu = 0;
        }
    }
    endShape();


    console.log(x,y,z);
}

function startAudio() {
    userStartAudio();
    osc1.start();
    osc2.start();
    osc3.start();
    playing = true;
}

function playSynth(x, y, z) {

    let x_mapped = map(abs(x), 0, 25, 100, 3000);
    let y_mapped = map(abs(y), 0, 25, 100, 3000);
    let z_mapped = map(abs(z), 0, 25, 100, 3000);
    if (playing) {
        // Second is transition time
        osc1.freq(x_mapped, 0.01);
        osc1.amp(.5, 0.01);
        osc2.freq(y_mapped, 0.01);
        osc2.amp(.5, 0.01);
        osc3.freq(z_mapped, 0.01);
        osc3.amp(.5, 0.01);
    }


    // let note = x_mapped;
    // // note velocity (volume, from 0 to 1)
    // let velocity = random();
    // // time from now (in seconds)
    // let time = 0;
    // // note duration (in seconds)
    // let dur = 1/32;
    // monoSynth.play(note, velocity, time, dur);
}
