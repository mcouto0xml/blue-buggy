
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [FasePrincipal],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scale: {
        mode: Phaser.Scale.FIT,  // Mantém a proporção e ajusta o jogo à tela sem cortar
        width: 1280, // Largura fixa
        height: 720, // Altura fixa
        parent: 'game-container'  // Define um contêiner HTML específico
    },
};

const game = new Phaser.Game(config);
