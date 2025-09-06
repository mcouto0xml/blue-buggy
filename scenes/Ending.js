// Ending cutscene and explanation
export default class Ending extends Phaser.Scene {
  constructor() {
    super('Ending');
  }

  preload() {
    this.load.image('bedroom', 'https://i.imgur.com/2yaf2wb.png');
    this.load.image('boy', 'https://i.imgur.com/4AiXzf8.png');
  }

  create() {
    this.add.image(480, 270, 'bedroom').setAlpha(0.8);
    this.add.image(600, 400, 'boy').setScale(0.5);
    this.text = this.add.text(100, 100, '', { font: '24px Arial', fill: '#fff', wordWrap: { width: 760 } });
    const explanation =
      'The Blue Beetle game is a real-life tradition where kids hit each other’s arms when they spot a blue VW Beetle. The origin is unclear, but it spread as a fun car trip game.';
    let blinkCount = 0;
    this.time.delayedCall(1000, () => this.showExplanation(explanation, blinkCount), []);
  }

  showExplanation(text, blinkCount) {
    if (blinkCount < 5) {
      this.text.setText(text + '\n(Eyes blinking...)');
      this.time.delayedCall(600, () => {
        this.text.setText(text);
        this.time.delayedCall(600, () => this.showExplanation(text, blinkCount + 1), []);
      }, []);
    } else {
      this.text.setText(text + '\nThe End.');
    }
  }
}
