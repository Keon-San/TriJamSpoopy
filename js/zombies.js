class Zombie extends CollidingObjectRectangle{
  constructor(x) {
    super(s * 0.025, s * 0.05, x, s, "green", true, false);
    this.correctY = ((6*s)/7)-(s * 0.05);
    this.targetX = 0;
  }

  die() {
    this.x = -1000;
    placer.zombiesInPlay--;
    if (this.id == objects.length) {
      objects.length--;
    } else {
      objects[this.id] = objects[objects.length];
      objects.length--;
    }
  }

  update() {
    console.log("Zombie update");
    this.targetX = player.x;

    if (this.targetX > this.x) this.velocity[0] = 0.0015 * d;
    else this.velocity[0] = -0.0015 * d;
    console.log(this.velocity[0]);
    if (this.y > this.correctY) {
      this.y -= 0.005 * s;
    } else {

      //console.log(this.velocity[0]);

      //console.log("HI ABOUT TO ENTER ZOMBIE MOVE");
      this.move(this.velocity[0], 0);
      this.velocity[1] += (9.8 / (60 * 10 * 1930)) * d;
      //console.log(this.velocity[1]);
      //var ground = this.move(0, this.velocity[1]);
      /*if (ground) {
        this.velocity[1] = 0;
      }*/
      this.velocity[0] = 0;
    }
  }
}
