class LoadingScreen extends Phaser.Scene {
  constructor() {
    super('LoadingScreen');
  }

  preload() {
    this.load.image('fundo-load', 'assets/Menu/loadingScreen.png')

  }

  create() {
    this.cameras.main.fadeIn(1000);
    this.add.image(
      this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundo-load').setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    this.time.addEvent({
      delay: 5000, // Tempo em milissegundos (2 segundos)
      callback: () => {

        this.cameras.main.fadeOut(1000);
        this.time.addEvent({
          delay: 1000, // Tempo em milissegundos (2 segundos)
          callback: () => {
            this.scene.start('FasePrincipal'); // Inicia a tela de configuração
          }
        })
      }
    })
  }
}
