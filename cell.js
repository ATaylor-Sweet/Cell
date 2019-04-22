class Cell {

  constructor(x, y, dna = null) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxspeed = 8;
    this.maxforce = 0.2;
    this.size = 50;
    this.health = 1;
    this.reproductionTimer = 0;

    //this.dna = [1, -0.1, 0.1];
    if(dna == null){
      this.dna = [random(-5, 5), random(-5, 5), random(-5, 5)];
    }else{
     this.dna = dna;
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);

    this.acceleration.mult(0);

    if (this.health > 0){
      this.health = this.health - 0.001;
      this.size = this.health * 50;
    }

    this.reproductionTimer ++;
  }

  decision(good, bad, population, cellPosition){
    let steerG = this.eat(good, 0.25);
    let steerB = this.eat(bad, -1);
    let steerP = this.mate(population, cellPosition);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);
    steerP.mult(this.dna[2]);

    this.applyForce(steerG);
    this.applyForce(steerB);
    this.applyForce(steerP);
  }

  eat(list, nutrition){
    let record = Infinity;
    let closestIndex = -1;
    for(let i = 0; i < list.length; i++){
      let distance = this.position.dist(list[i]);
      if(distance < record){
        record = distance;
        closestIndex = i;
      }
    }
    if(record < this.size/2){
      list.splice(closestIndex, 1);
      this.health = this.health + (0.1 * nutrition);
    }
    else if(closestIndex > -1){
      return(this.seek(list[closestIndex]));
    }
    return createVector(0, 0);
  }

  mate(list, cellPosition){
    let record = Infinity;
    let closestIndex = -1;
    for(let i = 0; i < list.length; i++){
      if (i !== cellPosition){
        console.log(list[i].position);
        console.log(list);
        console.log(i);
        let distance = this.position.dist(list[i].position);
        if(distance < record){
          record = distance;
          closestIndex = i;
        }
      }
    }
    if(record < this.size/2){
      this.breed(list[closestIndex]);
    }
    else if(closestIndex > -1){
      return(this.seek(list[closestIndex].position));
    }
    return createVector(0, 0);
  }

  breed(mate){
    if (this.reproductionTimer > 500 && mate.reproductionTimer > 500){
      let dna = [this.dna[0], mate.dna[1], this.dna[2]];
      cell.push(new Cell(this.position.x, this.position.y, dna));
      this.reproductionTimer = 0;
      mate.reproductionTimer = 0;
    }
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);

    desired.setMag(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    return(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  dead(){
    return(this.health <= 0.001);
  }

  display() {
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}
