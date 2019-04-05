let pop = 100;
let cell = [];
let food = [];
let foodAmount = 100;
let canvasSize = 650;

function setup() {
  createCanvas(canvasSize, canvasSize);
  for(i = 0;i < pop; i++){
    cell[i] = new Cell(random(canvasSize), random(canvasSize));
  }
  for(i = 0;i < foodAmount; i++){
    food.push(createVector(random(canvasSize), random(canvasSize)));
  }
}

function draw() {
  background(51);

  noStroke();
  fill(0,255,0);
  for(i = 0;i < food.length;i++){
    rect(food[i].x, food[i].y, 5, 5);
  }
  for(i = 0;i < pop; i++){
    cell[i].eat(food);
    cell[i].update();
    cell[i].display();
  }
}
