import Phaser from "phaser";
import Tree from "./assets/Tree/Tree.png";
import Char from "./assets/Char/Char.png";
import CharMap from "./assets/Char/Char.json";
import Ground from "./assets/Platform/Platform.png";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
    this.cursors = this.cursors;
    this.sprite01 = this.sprite01;
    this.sprite02 = this.sprite02;
    this.KeyA = this.KeyA;
    this.KeyW = this.KeyW;
    this.KeyD = this.KeyD;
  }

  preload() {
    this.load.image("tree", Tree);
    this.load.atlas("char", Char, CharMap);
    this.load.image("ground", Ground);
  }

  create() {
    this.sprite01 = this.physics.add.sprite(300, 550, "char");
    this.sprite02 = this.physics.add.sprite(520, 550, "char");
    this.sprite01.setBounce(0.2).setCollideWorldBounds(true);
    this.sprite02.setBounce(0.2).setCollideWorldBounds(true);

    const tree = this.physics.add.staticImage(400, 500, "tree").setScale(6);
    const platform = this.physics.add
      .staticImage(400, 600, "ground")
      .setScale(2.3)
      .setOffset(0, -15)
      .setSize(800, 100, true);

    this.physics.add.collider(this.sprite01, platform);
    this.physics.add.collider(this.sprite01, tree);

    this.physics.add.collider(this.sprite02, platform);
    this.physics.add.collider(this.sprite02, tree);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.sprite02.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.sprite02.setVelocityX(160);
    } else {
      this.sprite02.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.sprite02.body.touching.down) {
      this.sprite02.setVelocityY(-160);
    }

    if (this.KeyA.isDown) {
      this.sprite01.setVelocityX(-160);
    } else if (this.KeyD.isDown) {
      this.sprite01.setVelocityX(160);
    } else {
      this.sprite01.setVelocityX(0);
    }

    if (this.KeyW.isDown && this.sprite01.body.touching.down) {
      this.sprite01.setVelocityY(-160);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true
    }
  },
  scene: MyGame
};

const game = new Phaser.Game(config);
