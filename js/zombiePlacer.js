class ZombiePlacer {
  constructor() {
    this.x = d/2;
    this.zombiesTotal = 2;
    this.zombiesInPlay = 0;
    this.cooldown = 0;
    this.cooldownMax = 2 * 60;
    objects[objects.length] = this;
    this.velocity = [0, 0];
  }

  draw(ctx) {
    var path = new Path2D();
    ctx.fillStyle = "green";
    path.moveTo(this.x - 0.015 * d, s);
    path.lineTo(this.x, s - 0.03 * d);
    path.lineTo(this.x + 0.015 * d, s);
    ctx.fill(path);
  }

  move(x) {
    this.x += x;
  }

  placeZombie() {
    console.log("place");
    console.log(this.cooldown);
    if (this.cooldown == 0 && this.zombiesInPlay < this.zombiesTotal) {
      new Zombie(this.x);
      this.zombiesInPlay++;
      this.cooldown = this.cooldownMax;
    }
  }

  update() {
    if(this.cooldown != 0) {
      this.cooldown--;
    }
  }
}
