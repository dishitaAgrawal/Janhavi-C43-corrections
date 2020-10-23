class Player {
  constructor(x, y) {
    this.body = Bodies.circle(x, y, 2.5);
    this.image = playerImage = loadImage(
      "Images/1.png",
      "Images/2.png",
      "Images/3.png",
      "Images/4.png",
      "Images/5.png",
      "Images/6.png",
      "Images/7.png",
      "Images/8.png"
    );

    World.add(world, this.body);
  }

  display() {
    push();
    translate(this.body.position.x, this.body.position.y);
    imageMode(CENTER);
    image(this.image, 0, 0, 20, 20);
    pop();
  }
}
