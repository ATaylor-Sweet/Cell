let pop = 10;
let cell = [];
let food = [];
let foodRate = 0.1;
let poison = [];
let poisonRate = 0.01;
let canvasSize = 650;

function setup() {
  createCanvas(canvasSize, canvasSize);
  for(i = 0;i < pop; i++){
    cell[i] = new Cell(random(canvasSize), random(canvasSize));
  }
  for(i = 0;i < foodRate * 10; i++){
    food.push(createVector(random(canvasSize), random(canvasSize)));
  }
  for(i = 0;i < poisonRate * 10; i++){
    poison.push(createVector(random(canvasSize), random(canvasSize)));
  }
}

function draw() {
  background(51);

  noStroke();
  fill(0,255,0);
  for(let i = 0;i < food.length;i++){
    rect(food[i].x, food[i].y, 5, 5);
  }

  noStroke();
  fill(255, 0, 0);
  for(let i = 0;i < poison.length;i++){
    rect(poison[i].x, poison[i].y, 5, 5);
  }

  if(random(1) <= foodRate){
    food.push(createVector(random(canvasSize), random(canvasSize)));
  }
  if(random(1) <= poisonRate){
    poison.push(createVector(random(canvasSize), random(canvasSize)));
  }

  for(var i = cell.length - 1; i >= 0; i--){
    cell[i].decision(food, poison, cell, i);
    cell[i].update();
    cell[i].display();
    if(cell[i].dead() === true){
      cell.splice(i,1);
      pop--;
    }
  }
}
