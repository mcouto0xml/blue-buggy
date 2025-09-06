// Handles player input and beetle effects
export class InputHandler {
  constructor(scene, scoreSystem) {
    this.scene = scene;
    this.scoreSystem = scoreSystem;
    this.activeBeetle = null;
    this.cooldown = [false, false];
    this.keySpam = [0, 0];
    this.lastPressTime = [0, 0];
    this.blocked = [false, false];
    this.keys = [
      scene.input.keyboard.addKey('Q'),
      scene.input.keyboard.addKey('P')
    ];
  }

  setActiveBeetle(beetle) {
    this.activeBeetle = beetle;
    this.beetleActive = true;
  }

  update() {
    for (let i = 0; i < 2; i++) {
      if (Phaser.Input.Keyboard.JustDown(this.keys[i]) && !this.blocked[i]) {
        const now = this.scene.time.now;
        if (this.lastPressTime[i] && now - this.lastPressTime[i] < 400) {
          this.keySpam[i]++;
        } else {
          this.keySpam[i] = 0;
        }
        this.lastPressTime[i] = now;
        if (this.keySpam[i] > 5) {
          this.scene.add.text(480, 100, 'Father: Stop spamming!', { font: 'bold 32px Arial', fill: '#f00' }).setOrigin(0.5);
          this.scoreSystem.removeLife(i, 1);
          this.keySpam[i] = 0;
          this.blocked[i] = true;
          this.scene.time.delayedCall(1500, () => { this.blocked[i] = false; }, []);
          continue;
        }
        if (this.activeBeetle && this.beetleActive) {
          this.handleBeetle(i);
        } else {
          this.scoreSystem.removeLife(i, 1);
        }
      }
    }
  }

  handleBeetle(player) {
    const beetle = this.activeBeetle;
    if (!beetle.visible) return;
    beetle.visible = false;
    this.scene.showSlap(player + 1);
    switch (beetle.color) {
      case 'blue':
        this.scoreSystem.addScore(player, 1);
        break;
      case 'red':
        this.scoreSystem.addLife(player, 1);
        break;
      case 'black':
        this.scoreSystem.removeLife(1 - player, 2);
        break;
      case 'green':
        this.scene.add.text(480, 150, 'Vines block!', { font: 'bold 32px Arial', fill: '#0f0' }).setOrigin(0.5);
        this.blocked[1 - player] = true;
        this.scene.time.delayedCall(2000, () => { this.blocked[1 - player] = false; }, []);
        break;
    }
    this.beetleActive = false;
  }
}
