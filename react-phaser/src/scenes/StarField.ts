import Phaser from "phaser";

type Point = {
  x: number;
  y: number;
  z: number;
};

export default class StarField extends Phaser.Scene {
  private MAX_DEPTH: number = 32;
  private MAX_BOUNDS: number = 50;
  private points: Point[] = [];
  private stars: Phaser.GameObjects.Group;
  private speed: number = 0.1;

  constructor() {
    super("starfield");
  }

  init() {
    // this.stars = this.add.group();
  }

  create() {
    // for (let i = 0; i < 512; i++) {
    //   this.points.push({
    //     x: Phaser.Math.Between(-this.MAX_BOUNDS, this.MAX_BOUNDS),
    //     y: Phaser.Math.Between(-this.MAX_BOUNDS, this.MAX_BOUNDS),
    //     z: Phaser.Math.Between(1, this.MAX_DEPTH),
    //   });
    // }
    const { width } = this.scale;
    this.add
      .text(width * 0.5, 100, "imagine a beautiful star field here")
      .setOrigin(0.5);
  }

  update() {
    // this isn't done correctly but I don't know Phaser well
    // enough to do it right, one day
    // const { width, height } = this.scale;
    // this.stars.clear(true, true);
    //
    // for (let i = 0; i < this.points.length; i++) {
    //   let point = this.points[i];
    //
    //   point.z -= this.speed;
    //
    //   if (point.z <= 0) {
    //     point.x = Phaser.Math.Between(-this.MAX_BOUNDS, this.MAX_BOUNDS);
    //     point.y = Phaser.Math.Between(-this.MAX_BOUNDS, this.MAX_BOUNDS);
    //     point.z = this.MAX_DEPTH;
    //   }
    //
    //   let px = point.x * (128 / point.z) + width * 0.5;
    //   let py = point.y * (128 / point.z) + height * 0.5;
    //   let pz = (1 - point.z / 32) * 2;
    //
    //   let circle = this.add.circle(px, py, pz, 0xffffff, 1 - point.z / 32);
    //   this.stars.add(circle);
    // }
  }

  private increaseSpeed() {
    this.speed = 0.5;
  }
}
