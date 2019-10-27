class CollidingObjectRectangle {
  constructor (sizex, sizey, x, y, color, isZomb, isPlay) {
    this.x = x;
    this.y = y;
    this.sizex = sizex;
    this.sizey = sizey;
    this.color = color;
    this.isZombie = isZomb;
    this.isPlay = isPlay;
    this.velocity = [0.0, 0.0];
    this.onGround = false;
    this.id = objects.length;
    objects[objects.length] = this;
  }

  isColliding(other) {
    return ((this.x - this.sizex < other.x + other.sizex) && (this.x + this.sizex > other.x - other.sizex) && (this.y - this.sizey < other.y + other.sizey) && (this.y + this.sizey > other.y - other.sizey));
  }

  draw(ctx, objectInQuestion) {
    ctx.fillStyle = objectInQuestion.color;
    ctx.fillRect(objectInQuestion.x - objectInQuestion.sizex, objectInQuestion.y - objectInQuestion.sizey, objectInQuestion.sizex * 2, objectInQuestion.sizey * 2);
  }

  move(xAmount, yAmount) {
    const reduceAmount = 0.005;
    var oldx = this.x;
    var oldy = this.y;
    this.x += xAmount;
    this.y += yAmount;
    var collidingObj;
    var collided = false;
    while (collidingObj != -1) {
      collidingObj = -1;
      for (var i = 0; i < objects.length; i++) {
        if (i == this.id) continue;
        if (this.isColliding(objects[i])) {
          if ((this.isZombie && objects[i].isPlay)) {
            objects[i].die();
            return;
          } else if ((this.isPlay && objects[i].isZombie)) {
            if ((oldy + this.sizey < objects[i].y - objects[i].sizey)) {
              objects[i].die();
            } else {
              this.die();
              return;
            }
          }
          collidingObj = i;
          break;
        }
      }
      if (collidingObj != -1) {
        this.y -= yAmount * reduceAmount;
        this.x -= xAmount * reduceAmount;
        collided = true;
      }
    }
    return collided;
  }
}
