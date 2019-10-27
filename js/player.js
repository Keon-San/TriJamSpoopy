class Player extends CollidingObjectRectangle{
  constructor(color) {
    super(s * 0.025, s * 0.025, d/2, s/3, color, false, true);
  }

  die() {
    alert("The Player Lost! REload to play again!");
  }
}
