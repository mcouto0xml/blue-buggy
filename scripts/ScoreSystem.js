// Score system for two players
export class ScoreSystem {
  constructor(scene) {
    this.scene = scene;
    this.scores = [0, 0];
    this.lives = [3, 3];
    this.maxScore = 7;
    this.scoreText = [
      scene.add.text(50, 30, 'P1: 0', { font: '24px Arial', fill: '#0af' }),
      scene.add.text(800, 30, 'P2: 0', { font: '24px Arial', fill: '#fa0' })
    ];
    this.lifeText = [
      scene.add.text(50, 60, 'Lives: 3', { font: '18px Arial', fill: '#0af' }),
      scene.add.text(800, 60, 'Lives: 3', { font: '18px Arial', fill: '#fa0' })
    ];
  }

  addScore(player, points = 1) {
    this.scores[player] += points;
    this.scoreText[player].setText(`P${player + 1}: ${this.scores[player]}`);
  }

  addLife(player, amount = 1) {
    this.lives[player] += amount;
    this.lifeText[player].setText(`Lives: ${this.lives[player]}`);
  }

  removeLife(player, amount = 1) {
    this.lives[player] = Math.max(0, this.lives[player] - amount);
    this.lifeText[player].setText(`Lives: ${this.lives[player]}`);
  }

  isGameOver() {
    return this.scores[0] >= this.maxScore || this.scores[1] >= this.maxScore;
  }
}
