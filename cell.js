class Cell {

  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxspeed = 8;
    this.maxforce = 0.2;
    this.size = 50;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);

    this.acceleration.mult(0);

    if (this.size > 0){
      this.size = this.size - 0.1;
    }
  }

  eat(list){
    let record = Infinity;
    let closestIndex = -1;
    for(let i = 0; i < list.length; i++){
      let distance = this.position.dist(food[i]);
      if(distance < record){
        record = distance;
        closestIndex = i;
      }
    }
    if(record < this.size/2){
      list.splice(closestIndex, 1);
      this.size = this.size + 10;
    }
    else if(closestIndex > -1){
      this.seek(list[closestIndex]);
    }else{
      let mid = createVector(canvasSize/2, canvasSize/2);
      this.seek(mid);
    }
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);

    desired.setMag(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  display() {
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}
