// Cutscene: Blue Beetle passes school, kids react
class Cutscene extends Phaser.Scene {
  constructor() {
    super('Cutscene');
  }

  preload() {
    this.load.image('Imagem1', 'assets/Cutscenes/Frame 3.png')
    this.load.image('Imagem2', 'assets/Cutscenes/Frame 4.png')
    this.load.image('Imagem3', 'assets/Cutscenes/Frame 5.png')
    this.load.image('Parte1', 'assets/Cutscenes/Parte1.png')
    this.load.image('Parte2', 'assets/Cutscenes/Parte2.png')
    this.load.image('Parte3', 'assets/Cutscenes/Parte3.png')
    this.load.audio('falando', 'assets/audios/criancas.mp3')
    this.load.audio('socos', 'assets/audios/socos.mp3')
    this.load.audio('fusca', 'assets/audios/fuscaAzul.mp3')
  }

  create() {

    // CAMERA 
    this.falando = this.sound.add('falando', { loop: true, volume: 0.7 });
    this.socos = this.sound.add('socos', { loop: true, volume: 0.5 });
    this.fusca = this.sound.add('fusca', { loop: false, volume: 1.5 });
    this.falando.play();
    this.fundos = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Parte1' // chave da imagem carregada no preload
    ).setDepth(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);;
    this.fundo2 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Parte2' // chave da imagem carregada no preload
    ).setDepth(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height).setAlpha(0);
    this.fundo3 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Parte3' // chave da imagem carregada no preload
    ).setDepth(1).setDisplaySize(this.cameras.main.width, this.cameras.main.height).setAlpha(0);


    this.img1 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Imagem1' // chave da imagem carregada no preload
    ).setDepth(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height).setAlpha(0);
    this.img2 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Imagem2' // chave da imagem carregada no preload
    ).setDepth(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height).setAlpha(0);
    this.img3 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'Imagem3' // chave da imagem carregada no preload
    ).setDepth(1).setDisplaySize(this.cameras.main.width, this.cameras.main.height).setAlpha(0);

    this.time.addEvent({

      delay: 5000,  // Pisca a cada 3 segundos
      callback: () => {
        this.falando.stop()
        this.fusca.play()
        this.tweens.add({
          targets: this.fundo2,
          alpha: 1, // Alvo: tornar totalmente invisível
          duration: 1000, // Tempo da animação (0.5 segundo)
          ease: 'Power2'
        });
        this.time.addEvent({
          delay: 3000,  // Pisca a cada 3 segundos
          callback: () => {
            this.socos.play()
            this.tweens.add({
              targets: this.fundo3,
              alpha: 1, // Alvo: tornar totalmente invisível
              duration: 1000, // Tempo da animação (0.5 segundo)
              ease: 'Power2'
            });
            this.time.addEvent({
              delay: 4000,  // Pisca a cada 3 segundos
              callback: () => {
                this.socos.stop()
                this.cameras.main.fadeOut(1000);
                this.fundos.setAlpha(0);
                this.fundo2.setAlpha(0);
                this.fundo3.setAlpha(0);
                this.cameras.main.fadeIn(1000);
                this.time.addEvent({
                  delay: 1000,  // Pisca a cada 3 segundos
                  callback: () => {
                    this.tweens.add({
                      targets: this.img1,
                      alpha: 1, // Alvo: tornar totalmente invisível
                      duration: 1000, // Tempo da animação (0.5 segundo)
                      ease: 'Power2'
                    });
                    this.time.addEvent({
                      delay: 4000,  // Pisca a cada 3 segundos
                      callback: () => {
                        this.tweens.add({
                          targets: this.img2,
                          alpha: 1, // Alvo: tornar totalmente invisível
                          duration: 1000, // Tempo da animação (0.5 segundo)
                          ease: 'Power2'
                        });
                        this.time.addEvent({
                          delay: 4000,  // Pisca a cada 3 segundos
                          callback: () => {
                            this.tweens.add({
                              targets: this.img3,
                              alpha: 1, // Alvo: tornar totalmente invisível
                              duration: 1000, // Tempo da animação (0.5 segundo)
                              ease: 'Power2'
                            });
                            this.time.addEvent({
                              delay: 4000,  // Pisca a cada 3 segundos
                              callback: () => {
                                this.cameras.main.fadeOut(1000);
                                this.time.addEvent({
                                  delay: 1000, // Tempo em milissegundos (2 segundos)
                                  callback: () => {
                                    this.scene.start('LoadingScreen'); // Inicia a tela de configuração
                                  }
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  showDialog() {
  }
}
