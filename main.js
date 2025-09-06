import Phaser from 'phaser';
import Cutscene from './scenes/Cutscene.js';
import LoadingScreen from './scenes/LoadingScreen.js';
import Gameplay from './scenes/Gameplay.js';
import Ending from './scenes/Ending.js';

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'game-container',
  backgroundColor: '#222',
  scene: [Cutscene, LoadingScreen, Gameplay, Ending],
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};

const game = new Phaser.Game(config);
