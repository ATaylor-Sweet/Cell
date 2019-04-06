class Cell {

  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxspeed = 8;
    this.maxforce = 0.2;
    this.size = 50;
    this.health = 1;

    this.dna = [5, -5];

    //this.dna[0] = random(-5, 5);
    //this.dna[1] = random(-5, 5);
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
  }

  decision(good, bad){
    let steerG = this.eat(good, 1);
    let steerB = this.eat(bad, -1);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
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
