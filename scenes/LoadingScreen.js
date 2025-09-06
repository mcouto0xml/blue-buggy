// Loading screen with Beetle animation
export default class LoadingScreen extends Phaser.Scene {
  constructor() {
    super('LoadingScreen');
  }

  init(data) {
    this.nextScene = data.next || 'Gameplay';
  }

  preload() {
    this.load.image('beetle', 'https://i.imgur.com/1Q9Z1Zm.png');
  }

  create() {
    this.add.text(400, 250, 'Loading...', { font: '32px Arial', fill: '#fff' });
    const beetle = this.add.image(480, 350, 'beetle').setScale(0.5);
    this.tweens.add({
      targets: beetle,
      x: 700,
      y: 350,
      yoyo: true,
      repeat: 2,
      duration: 800
    });
    this.time.delayedCall(2000, () => {
      this.scene.start(this.nextScene);
    });
  }
}
