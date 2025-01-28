
//-----RGB COLOURS-----
//
// dunkel lila: (68,0,102)
// helles lila: (200,120,255)
// knalliges lila: (163,0,219)
// rosa: (242,175,233)
// rot: (255,96,71)
// helles grün: (215,242,119)
// knalliges grün: (211,250,7)
// blau (80,215,217)
//
// für transparenz einen vierten wert in der klammer eingeben (alpha kanal); bsp.: (211,250,7,10)



//Wobble (blau)
// center point
let centerX = 0.0, centerY = 0.0;

let radius = 400, rotAngle = -90;
let accelX = 0.0, accelY = 0.0;
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.001, damping = 0.98;

//corner nodes
let nodes = 15;

//zero fill arrays
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// soft-body dynamics
let organicConstant = 050;

//Perlin Noise (weiße Linie)
let inc = 0.005;
let start = 0;

//---------------------------------------------------------------------------------------------------------------------------
// FUNCTION SETUP
//---------------------------------------------------------------------------------------------------------------------------

function setup() {
  // put setup code here
  createCanvas(windowWidth,windowHeight);


  // Wobble (blau)
  //center shape in window
  centerX = 1000;
  centerY = height / 2;

  //initialize arrays to 0
  for (let i = 0; i < nodes; i++){
     nodeStartX[i] = 0;
     nodeStartY[i] = 0;
     nodeY[i] = 0;
     nodeY[i] = 0;
     angle[i] = 0;
    }

  // iniitalize frequencies for corner nodes
  for (let i = 0; i < nodes; i++){
     frequency[i] = random(0,2, 1);
    }

  noStroke();
  frameRate(15);
  
  // Zacken 
  //noiseSeed(1);

}

//-----RGB COLOURS-----
//
// dunkel lila: (68,0,102)
// helles lila: (200,120,255)
// knalliges lila: (163,0,219)
// rosa: (242,175,233)
// rot: (255,96,71)
// helles grün: (215,242,119)
// knalliges grün: (211,250,7)
// blau (80,215,217)
//
// für transparenz einen vierten wert in der klammer eingeben (alpha kanal); bsp.: (211,250,7,10)


//---------------------------------------------------------------------------------------------------------------------------
// FUNCTION DRAW
//---------------------------------------------------------------------------------------------------------------------------

function draw() {

  //background(211,255,7);


  //rießiger weißer Kreis
  strokeWeight(90);
  //stroke(211,250,7,20); //knall grün
  //stroke(215,242,119); //seichtes grün
  //stroke(163,0,219); //violet
  stroke(80,215,217,70); //blau
  noFill();
  circle(200,600,450);
  strokeWeight(2);
  //stroke(80,215,217,70); //blau
  stroke(215,242,119,30); //seichtes grün
  noFill();
  circle(160,400,400);


 //---------------------------------------------------------------------------------------------------------------------------
 // VERDAUUNG UND EMOTIONEN  /  kreise rechts
 //---------------------------------------------------------------------------------------------------------------------------

  //strokeWeight(90);
  //stroke(255,255,255,20);
  stroke(215,242,119);
  strokeWeight(4);
  noFill();
  circle(1400,350,160);
  fill(213,113,255,10);
  noStroke();
  circle(1500,300,170);
  circle(1700,600,300);
  circle(1400,320,190);
  fill(80,215,217,5);
  circle(1400,450,120);
  
 
 //---------------------------------------------------------------------------------------------------------------------------
 // BLUTUNG  /  rote sinus kurve
 //---------------------------------------------------------------------------------------------------------------------------

    //positionierung Punkte in Bewegung
    var yKoord = 700;
    var xKoord = 00;
    //größe der Kreise
    var durchmesser = 70;
    // abstand zwischen den Kreisen
    var xDelta = durchmesser + 10;
    //fill(255,70,0); //orange
    //fill(95,59,176); //Lila
    fill(200,120,255); //helles violet
    //strokeWeight(0.1);
    //stroke(255,239,21.50)
    //noStroke();

    for (var i = 0; i < 50; i++) {
        ellipse(xKoord + (xDelta * i), yKoord + sin(frameCount/50-((2*PI/10)*i)) * 400, durchmesser, durchmesser);
    }


 //---------------------------------------------------------------------------------------------------------------------------
 // ENERGIE  /  orangene sinus kurve
 //---------------------------------------------------------------------------------------------------------------------------

    //positionierung gelbe sinus  kurve
    var yKoord = 500;
    var xKoord = 00;
    //größe der Kreise
    var durchmesser = 25;
    // abstand zwischen den Kreisen
    var xDelta = durchmesser + 9;
    //fill(215,242,119); // grün
    //fill(163,0,219); //violet
    //fill(242,189,233); //rosa
    fill(255,96,71); //orange
    strokeWeight(1);
    stroke(255,239,21)
    //fill(127.5 + 127.5 * cos(this.positionX + tan (millis() / 5000) + millies() / 500), 127.5+ 127.5 * sin(this.positionY + cos(millis() / 500) + millis() / 500), 120.5);
    //fill(242,0,255)
    //fill(255);
    noStroke();

    // anzahl wie viele Objekte
    for (var i = 0; i < 80; i++) {
        rect(xKoord + (xDelta * i), yKoord + sin(frameCount/150-((6*PI/200)*i)) *700, durchmesser, durchmesser);
    }

    //fade background
    fill(68,0,102,5);
    //fill(211,250,7,10);
    rect(0, 0, width, height);
    drawShape();
    moveShape();
}

 //---------------------------------------------------------------------------------------------------------------------------
 // REGELMAESSIGKEIT + MEDIKAMENTE  /  wobble bobble
 //---------------------------------------------------------------------------------------------------------------------------
        // das kann zum Beispiel nicht dupliziert werden

function drawShape() { 

  //calculate node  starting locations
  for (let i = 0; i < nodes; i++){
     nodeStartX[i] = centerX + cos(radians(rotAngle)) * radius;
     nodeStartY[i] = centerY + sin(radians(rotAngle)) * radius;
     rotAngle += 360.0 / nodes;
    }

    // draw polygon
    curveTightness(organicConstant);
    noFill();
    stroke(80,215,217,50);
    //stroke(246,77,255); // Farbe Polygon
    //stroke(255);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < nodes; i++){
     curveVertex(nodeX[i], nodeY[i]);
    }

    for (let i = 0; i < nodes-1; i++){
     curveVertex(nodeX[i], nodeY[i]);
    }
    endShape(CLOSE);
}


function moveShape() {
  //move center point
  deltaX = 100 - centerX;
  deltaY = 300 - centerY;

  // create springing effect
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // move predator's center
  //centerX += accelX;
  //centerY += accelY;

  // slow down springing geschwindigkeit
  accelX *= damping;
  accelY *= damping;

  // change curve tightness
  organicConstant = 0 - ((abs(accelX) + abs(accelY)) * 0.1);

  //move nodes
  for (let i = 0; i < nodes; i++){
     nodeX[i] = nodeStartX[i] + sin(radians(angle[i])) * (accelX * 10);
     nodeY[i] = nodeStartY[i] + sin(radians(angle[i])) * (accelY * 10);
     angle[i] += frequency[i];
    }

 //---------------------------------------------------------------------------------------------------------------------------
 // STIMMUNG  /  perlin noise kurve 
 //---------------------------------------------------------------------------------------------------------------------------

    //stroke(211,250,7);
    noFill();

  // KURVE 1---------------------------------------------------------------------
    beginShape();
    let xoff = start;
    for (let x = 0; x < width; x++) {
      strokeWeight(1);
      stroke(213,113,255,50);
      // let y = random(height);
      let y = noise(xoff) * height;
      vertex(x, y);
      
      xoff += inc;
    }
    endShape();

 // KURVE 2---------------------------------------------------------------------
    beginShape();
    //let xoff = start;
    for (x = 0; x < width; x++) {
      strokeWeight(1);
      stroke(255,90);
      // let y = random(height);
      let y = noise(xoff) * height;
      vertex(x, y);
      
      xoff += inc;
    }
    endShape();

  // KURVE 3---------------------------------------------------------------------
    beginShape();
    //let xoff = start;
    for (x = 0; x < width; x++) {
      strokeWeight(1);
      stroke(255,90);
      // let y = random(height);
      let y = noise(xoff) * height;
      vertex(x, y);
      
      xoff += inc;
    }
    endShape();

  // KURVE 4---------------------------------------------------------------------
    beginShape();
    //let xoff = start;
    for (x = 0; x < width; x++) {
      strokeWeight(1);
      stroke(255,90);
      // let y = random(height);
      let y = noise(xoff) * height;
      vertex(x, y);
      
      xoff += inc;
    }
    endShape();

  // KURVE 5---------------------------------------------------------------------
    beginShape();
    //let xoff = start;
    for (x = 0; x < width; x++) {
      strokeWeight(1);
      stroke(68,0,102,5);
      // let y = random(height);
      let y = noise(xoff) * height;
      vertex(x, y);
      
      xoff += inc;
    }
    endShape();
    
    start += inc;

    beginShape();
    //stroke(80,215,217);
    noStroke();
    //fill(213,113,255,30); 
    fill(215,242,119,30); //seichtes grün

    ellipse (1000,900,400);
    endShape();
    
    //noLoop();

 //---------------------------------------------------------------------------------------------------------------------------
 // SCHMERZ  /  zacken 
 //---------------------------------------------------------------------------------------------------------------------------
        // Wenn man die auskommentiert funtioniert gar nichts mehr)

  //strokeWeight(2);

  //noFill();
  //for (let start = -200; start < 0; start += 10) {
     
      //stroke(255);

      //beginShape();
      // Put a vertex at a random y point at each point x.
      //for (let x = 0; x <= window.width; x += 20) {
          // Noise function to smooth out the wave.
          //let y = map(noise(x / 100, tick), 0, 1, start, start + 1000);
          // Use a sine wave to make it loop.
          //let y = map(noise(x / 200, Math.sin(tick)), 0, 1, start, start + 200);
          //vertex(x, y);
      //}
      //endShape();
  //}
  //tick += .01;

}
