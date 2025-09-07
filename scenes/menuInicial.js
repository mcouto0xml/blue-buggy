// Ending cutscene and explanation
class menuInicial extends Phaser.Scene {
  constructor() {
    super('menuInicial');
  }

  preload() {
    this.load.image('fundo', 'assets/Menu/Menu.png')
    this.load.image('logo', 'assets/Menu/logo.png')
  }

  create() {
    
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundo')  // Adiciona a imagem de fundo como o tamanho da camera dividido por 2; 
            .setOrigin(0.5, 0.5) // Define o ponto de origem
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Define o tamanho da tela da imagem
        this.add.image(160, 160, 'logo').setScale(0.6)
  }

  showExplanation(text, blinkCount) {
  }
}