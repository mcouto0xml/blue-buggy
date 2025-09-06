// Cutscene: Blue Beetle passes school, kids react
export default class Cutscene extends Phaser.Scene {
  constructor() {
    super('Cutscene');
  }

  preload() {
    // Placeholder assets
    this.load.image('school', 'https://i.imgur.com/2yaf2wb.png');
    this.load.image('beetle', 'https://i.imgur.com/1Q9Z1Zm.png');
    this.load.image('kid', 'https://i.imgur.com/4AiXzf8.png');
    this.load.audio('car', 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b6b7b7b.mp3');
  }

  create() {
    this.add.image(480, 270, 'school').setScale(1.2);
    this.kids = [];
    for (let i = 0; i < 5; i++) {
      this.kids.push(this.add.image(200 + i * 100, 400, 'kid').setScale(0.5));
    }
    this.beetle = this.add.image(-100, 370, 'beetle').setScale(0.5);
    this.sound.play('car');
    this.dialog = [
      "Why are you hitting each other's arms?",
      "I don't know, but if everyone is doing it, it must be a game.",
      "Parents arrive, kids leave."
    ];
    this.dialogIndex = 0;
    this.text = this.add.text(100, 100, '', { font: '24px Arial', fill: '#fff', wordWrap: { width: 760 } });
    this.time.delayedCall(1000, () => this.showDialog(), []);
    this.tweens.add({
      targets: this.beetle,
      x: 1000,
      duration: 3000,
      onComplete: () => {
        this.time.delayedCall(2000, () => this.scene.start('LoadingScreen', { next: 'Gameplay' }), []);
      }
    });
  }

  showDialog() {
    if (this.dialogIndex < this.dialog.length) {
      this.text.setText(this.dialog[this.dialogIndex]);
      this.dialogIndex++;
      this.time.delayedCall(2000, () => this.showDialog(), []);
    }
  }
}
