let pop = 100;
let cell = [];
let food = [];
let foodRate = 1;
let poison = [];
let poisonRate = 0.05;
let canvasSize = 925;
let mutateAmount = 0.05;
let mutateRate = 0.5;
let breedRate = 75;
let averageTimer = 0;
let averageDNA = [];


let sliderFoodRate;
let sliderPoisonRate;
let sliderBreed;
let sliderMutateRate;
let sliderMutateAmount;

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


  sliderFoodRate = createSlider(0, 100, 100);
  sliderFoodRate.position(20, 30);
  sliderFoodRate.changed(changeFoodRate);

  sliderPoisonRate = createSlider(0, 100, 5);
  sliderPoisonRate.position(20, 60);
  sliderPoisonRate.changed(changePoisonRate);

  sliderBreed = createSlider(50, 250, 75);
  sliderBreed.position(20, 90);
  sliderBreed.changed(changeBreed);

  sliderMutateRate = createSlider(0, 100, 5);
  sliderMutateRate.position(20, 120);
  sliderMutateRate.changed(changeMutateRate);

  sliderMutateAmount = createSlider(0, 100, 50);
  sliderMutateAmount.position(20, 150);
  sliderMutateAmount.changed(changeMutateAmount);
}

function draw() {
  background(51);

  noStroke();
  fill(0,255,0);
  for(let i = 0;i < food.length;i++){
    rect(food[i].x, food[i].y, 3, 3);
  }

  noStroke();
  fill(255, 0, 0);
  for(let i = 0;i < poison.length;i++){
    rect(poison[i].x, poison[i].y, 3, 3);
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
  fill(255, 255, 255);
  stroke(0, 0, 0);
  text('Food Spawn Rate', sliderFoodRate.x * 2 + sliderFoodRate.width, 40);
  text('Poison Spawn Rate', sliderPoisonRate.x * 2 + sliderPoisonRate.width, 70);
  text('Breed Clock', sliderBreed.x * 2 + sliderBreed.width, 100);
  text('Mutate Rate', sliderMutateRate.x * 2 + sliderMutateRate.width, 130);
  text('Mutate Amount', sliderMutateAmount.x * 2 + sliderMutateAmount.width, 160);

  if (averageTimer > 100){
    averageTimer = 0;
    for(var i = cell.length -1; i >= 0; i--){
        averageDNA[0] =+ cell[i].dna[0];
        averageDNA[1] =+ cell[i].dna[1];
        averageDNA[2] =+ cell[i].dna[2];
    }
    averageDNA[0] = averageDNA[0]/cell.length;
    averageDNA[1] = averageDNA[1]/cell.length;
    averageDNA[2] = averageDNA[2]/cell.length;
  }else{
    averageTimer++;
  }
  text('Food: ' + averageDNA[0], 10, 190);
  text('Poison: ' + averageDNA[1], 10, 220);
  text('Mate: ' + averageDNA[2], 10, 250);
}

function changeFoodRate(){
  let rate = sliderFoodRate.value()/100
  foodRate = rate;
}

function changePoisonRate(){
  let rate = sliderPoisonRate.value()/100
  poisonRate = rate;
}

function changeBreed(){
  let rate = sliderBreed.value()
  breedRate = rate;
}

function changeMutateRate(){
  let rate = sliderMutateRate.value()/100
  mutateRate = rate;
}

function changeMutateAmount(){
  let rate = sliderMutateAmount.value()/100
  mutateAmount = rate;
}
