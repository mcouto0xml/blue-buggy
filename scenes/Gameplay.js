// Main gameplay scene
import { ScoreSystem } from '../scripts/ScoreSystem.js';
import { InputHandler } from '../scripts/InputHandler.js';

const BEETLE_COLORS = ['blue', 'red', 'black', 'green'];
const BEETLE_ASSETS = {
  blue: 'https://i.imgur.com/1Q9Z1Zm.png',
  red: 'https://i.imgur.com/8Qw1FQb.png',
  black: 'https://i.imgur.com/3Qw1FQb.png',
  green: 'https://i.imgur.com/5Qw1FQb.png'
};

export default class Gameplay extends Phaser.Scene {
  constructor() {
    super('Gameplay');
  }

  preload() {
    this.load.image('carInterior', 'https://i.imgur.com/2yaf2wb.png');
    this.load.image('background', 'https://i.imgur.com/4AiXzf8.png');
    for (const color of BEETLE_COLORS) {
      this.load.image(`beetle_${color}`, BEETLE_ASSETS[color]);
    }
    this.load.image('slap', 'https://i.imgur.com/6Qw1FQb.png');
  }

  create() {
    // Scrolling background
    this.bg = this.add.tileSprite(480, 270, 960, 540, 'background');
    this.add.image(480, 270, 'carInterior').setAlpha(0.7);
    this.scoreSystem = new ScoreSystem(this);
    this.inputHandler = new InputHandler(this, this.scoreSystem);
    this.beetle = null;
    this.nextBeetleTime = 2000;
    this.spawnBeetle();
    this.slapText = this.add.text(480, 200, '', { font: 'bold 48px Comic Sans MS', fill: '#ff0' }).setOrigin(0.5);
  }

  update(time, delta) {
    this.bg.tilePositionX += 2;
    this.inputHandler.update();
    if (this.scoreSystem.isGameOver()) {
      this.scene.start('LoadingScreen', { next: 'Ending' });
    }
  }

  spawnBeetle() {
    const color = Phaser.Utils.Array.GetRandom(BEETLE_COLORS);
    if (this.beetle) this.beetle.destroy();
    this.beetle = this.add.image(200, 400, `beetle_${color}`).setScale(0.5);
    this.beetle.color = color;
    this.beetle.visible = true;
    this.inputHandler.setActiveBeetle(this.beetle);
    this.time.delayedCall(Phaser.Math.Between(2000, 4000), () => this.spawnBeetle(), []);
  }

  showSlap(winner) {
    this.slapText.setText('SLAP!');
    this.slapText.setStyle({ fill: winner === 1 ? '#0af' : '#fa0' });
    this.tweens.add({
      targets: this.slapText,
      alpha: 0,
      duration: 800,
      onComplete: () => {
        this.slapText.setText('');
        this.slapText.setAlpha(1);
      }
    });
  }
}
