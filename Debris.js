class Debris {
  constructor() {
    this.debris = createSprite(random(100, 800), random(0, 100), 20, 20);
    this.debris.addImage("Asteroid", asteroid);
    this.debris.scale = 0.3;

    debrisGroup.add(this.debris);
  }
  gravity() {
    this.debris.velocityY = this.debris.velocityY + 0.07;

    if (this.debris.y > 500) {
      this.debris.x = random(100, 800);
      this.debris.y = random(0, 100);
    }
  }
}
