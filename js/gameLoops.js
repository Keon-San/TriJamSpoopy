var c = document.getElementById("gameScreen");
var ctx = c.getContext("2d");
var s = window.innerHeight * (0.95);
c.height = s;
c.width = window.innerWidth * (0.95);
var d = c.width;
var player;
var placer;
var objects = [];
var keyDown = [];
var keyJustPressed = [];
var playerVelocity = [0.0, 0.0]
var playerGravityVelocity = 0;

onkeydown = function(e) {
  console.log(e.which);
  keyDown[e.which] = true;
  keyJustPressed[e.which] = true;
}

onkeyup = function(e) {
  keyDown[e.which] = false;
}
function onLoad() {
  player = new Player("blue");
  new CollidingObjectRectangle(d/2, s/14, d/2, (13*s)/14, "red");
  placer = new ZombiePlacer();
  setInterval(update, 1000/60);
}

function update() {
  //d
  if (keyDown[68] && player.x + player.sizex < d) {
    player.velocity[0] += 0.003 * d;
  }
  if (keyDown[65] && player.x > player.sizex) {
    player.velocity[0] -= 0.003 * d;
  }
  if (keyDown[87] && player.onGround) {
    player.velocity[1] -= .00625 * s;
    player.onGround = false;
  }
  if (keyJustPressed[38]) {
    placer.placeZombie();
  }
  if (keyDown[37]) {
    placer.velocity[0] -= 0.003 * d;
  }
  if (keyDown[39]) {
    placer.velocity[0] += 0.003 * d;
  }
  player.move(player.velocity[0], 0);
  placer.move(placer.velocity[0]);
  player.velocity[1] += (9.8 / (60 * 2 * 1930)) * d;
  player.onGround = player.move(0, player.velocity[1]);
  if (player.onGround) {
    playerGravityVelocity = 0;
  }
  ctx.clearRect(0,0,d,s);
  for (var i = 0; i < objects.length; i++) {
    objects[i].draw(ctx, objects[i]);
    if (objects[i].isZombie) objects[i].update();
  }
  placer.update();
  placer.velocity[0] = 0;
  player.velocity[0] = 0;
  keyJustPressed = [];
}
