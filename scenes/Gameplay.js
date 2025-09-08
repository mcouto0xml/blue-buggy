


// Main gameplay scene
class FasePrincipal extends Phaser.Scene {
  constructor() {
    super('FasePrincipal');
  }

  preload() {



    // Carregar sprites dos carros

    this.load.spritesheet("fusca", "assets/Sprites/FuscaSprite.png", { frameWidth: 300, frameHeight: 163 })
    this.load.spritesheet("uno", "assets/Sprites/uno.png", { frameWidth: 260.33, frameHeight: 164 })
    this.load.spritesheet("policia", "assets/Sprites/policia.png", { frameWidth: 322, frameHeight: 194 })
    this.load.spritesheet("taxi", "assets/Sprites/taxi.png", { frameWidth: 335, frameHeight: 154 })
    this.load.spritesheet("carroPreto", "assets/Sprites/carroPreto.png", { frameWidth: 329, frameHeight: 167 })
    // Carregar Imagem dos Players

    this.load.image('P1', 'assets/Jogabilidade/P1.png')
    this.load.image('P2', 'assets/Jogabilidade/P2.png')

    this.load.image('WinP1', 'assets/Jogabilidade/WinP1.png')
    this.load.image('WinP2', 'assets/Jogabilidade/WinP2.png')


    // Menu

    this.load.image('P1_fundo', 'assets/Jogabilidade/P1_fundo.png')

    this.load.image('soco', 'assets/Jogabilidade/soco.png')

    this.load.image('socoP1', 'assets/Jogabilidade/socoP1.png')
    this.load.image('socoP2', 'assets/Jogabilidade/socoP2.png')
    // Carregar áudios
    this.load.audio('carRide', 'assets/audios/car-ride.mp3');
    this.load.audio('radio', 'assets/audios/radio.mp3');
    this.load.audio('punch', 'assets/audios/punch.mp3');
    this.load.audio('winner', 'assets/audios/winner.mp3');

    this.load.image('fundo', 'assets/Estrada/fundo.png')
    this.load.image('nuvens', 'assets/Estrada/nuvens.png')
    this.load.image('ruas', 'assets/Estrada/ruas.png')
  }

  create() {
    this.fundo = this.add.tileSprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      'fundo' // chave da imagem carregada no preload
    ).setDepth(0);

    this.ruas = this.add.tileSprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      'ruas' // chave da imagem carregada no preload
    ).setDepth(2);



    this.socoP1 = this.add.image(200, 600, 'socoP1').setAlpha(0).setDepth(50)
    this.socoP2 = this.add.image(1100, 600, 'socoP2').setAlpha(0).setDepth(50)

    this.WinP1 = this.add.image(640, 360, 'WinP1').setAlpha(0).setDepth(50)
    this.WinP2 = this.add.image(640, 360, 'WinP2').setAlpha(0).setDepth(50)

    this.cameras.main.fadeIn(1000);
    this.lights.enable().setAmbientColor(0x555555);

    this.lights.addLight(400, 300, 200).setColor(0xffffff).setIntensity(2);
    // Pontuação
    this.pontos = { j1: 0, j2: 0 };
    this.perso1 = this.add.image(70, 50, 'P1').setScale(0.45)
    this.perso2 = this.add.image(1090, 50, 'P2').setScale(0.45)

    this.textoPontoJ1 = this.add.text(160, 28, '', { fontFamily: "ByteBounce", fontSize: '48px', fill: '#fff' });
    this.textoPontoJ2 = this.add.text(1190, 28, '', { fontFamily: "ByteBounce", fontSize: '48px', fill: '#fff' });

    this.soco = this.add.image(135, 55, 'soco').setScale(0.1)
    this.soco2 = this.add.image(1165, 55, 'soco').setScale(0.1)
    // Teclas para cada jogador
    this.teclaJ1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q); // Jogador 1 aperta "A"
    this.teclaJ2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); // Jogador 2 aperta "L"

    // Flag se fusca está na tela
    this.fuscaNaTela = false;



    this.carRideAudio = this.sound.add('carRide', { loop: true, volume: 0.5 });
    this.radioAudio = this.sound.add('radio', { loop: true, volume: 0.5 });
    this.punchAudio = this.sound.add('punch', { volume: 1 });
    this.winner = this.sound.add('winner', { volume: 0.6 });

    this.carRideAudio.play();

    this.time.addEvent({
      delay: 2000, // Tempo em milissegundos (2 segundos)
      callback: () => {
        this.radioAudio.play(); // Inicia a tela de configuração
        // O áudio de fundo já está tocando junto
      }
    })

    this.reacaoLiberada = false;


    let SpawnVelo = [2000, 1500]
    let Svelo = Phaser.Math.RND.pick(SpawnVelo);
    // Spawn de carros continuamente
    this.time.addEvent({
      delay: Svelo, // a cada 2s
      callback: this.spawnCarro,
      callbackScope: this,
      loop: true
    });

    this.gameOver = false
  }

  spawnCarro() {


    // Decide aleatoriamente se será fusca ou carro comum
    let ehFusca = Phaser.Math.Between(0, 3) === 0; // 20% de chance

    let carrosG = ["uno", "policia", "taxi", "carroPreto"]
    let outro = Phaser.Math.RND.pick(carrosG)
    let tipo = ehFusca ? 'fusca' : outro;


    let velocidades = [-500, -450, -400]
    let Y = [650, 675]


    let velo = Phaser.Math.RND.pick(velocidades);
    let PosY = Phaser.Math.RND.pick(Y);

    let scale = 0

    if (ehFusca) {
      scale = 0.5
    }
    else {
      scale = 0.5
    }

    let carro = this.add.sprite(1400, PosY, tipo).setScale(scale).setDepth(20); // aparece à direita
    carro.flipX = true;
    this.physics.add.existing(carro);

    this.anims.create({
      key: 'andar_' + tipo, // Nome da animação
      frames: this.anims.generateFrameNumbers(tipo, { start: 0, end: 2 }), // Alterna entre normal e piscando
      frameRate: 40,  // Velocidade da animação
      repeat: -1     // Não repete continuamente
    });


    if (PosY == 675) {
      carro.setDepth(21)
    }
    carro.body.setVelocityX(velo); // anda para esquerda
    carro.play('andar_' + tipo);
    if (ehFusca) {

      this.fuscaNaTela = true;
      this.reacaoLiberada = true;

      // Se o fusca sair da tela e ninguém apertou → perde a chance
      this.time.delayedCall(4000, () => {
        if (this.fuscaNaTela) {
          carro.destroy();
          this.fuscaNaTela = false;
          this.reacaoLiberada = false;
        }
      });
    } else {
      carro.once('update', () => {
        if (carro.x < -50) carro.destroy();
      });
    }
  }

  update() {
    if (!this.gameOver) {
      if (this.pontos.j1 === 7) {
        this.gameOver = true; // ativa fim de jogo
        this.tweens.add({
          targets: this.WinP1,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.reacaoLiberada = false;
        this.winner.play(); // agora toca 1x só
        this.time.delayedCall(6000, () => {
          window.location.reload();
        });
      } else if (this.pontos.j2 === 7) {
        this.gameOver = true;
        this.tweens.add({
          targets: this.WinP2,
          alpha: 1,
          duration: 1000,
          ease: 'Power2'
        });
        this.reacaoLiberada = false;
        this.winner.play();
        this.time.delayedCall(6000, () => {
          window.location.reload();
        });
      }
    }
    if (this.reacaoLiberada) {
      if (Phaser.Input.Keyboard.JustDown(this.teclaJ1)) {
        this.pontos.j1++;
        this.atribuiPonto(1);
        this.punchAudio.play();

        this.tweens.add({
          targets: this.socoP1,
          alpha: 1, // Alvo: tornar totalmente invisível
          duration: 1000, // Tempo da animação (0.5 segundo)
          ease: 'Power2'
        });
        this.time.delayedCall(1500, () => {
          this.tweens.add({
            targets: this.socoP1,
            alpha: 0, // Alvo: tornar totalmente invisível
            duration: 1000, // Tempo da animação (0.5 segundo)
            ease: 'Power2'
          });
        })
      } else if (Phaser.Input.Keyboard.JustDown(this.teclaJ2)) {
        this.pontos.j2++;
        this.atribuiPonto(2);
        this.punchAudio.play();

        this.tweens.add({
          targets: this.socoP2,
          alpha: 1, // Alvo: tornar totalmente invisível
          duration: 1000, // Tempo da animação (0.5 segundo)
          ease: 'Power2'
        });
        this.time.delayedCall(1500, () => {
          this.tweens.add({
            targets: this.socoP2,
            alpha: 0, // Alvo: tornar totalmente invisível
            duration: 1000, // Tempo da animação (0.5 segundo)
            ease: 'Power2'
          });
        })
      }
    }

    this.fundo.tilePositionX -= 2;
    this.ruas.tilePositionX -= 6;
  }

  atribuiPonto(jogador) {
    this.textoPontoJ1.setText(`${this.pontos.j1}`);
    this.textoPontoJ2.setText(`${this.pontos.j2}`);
    this.fuscaNaTela = false;
    this.reacaoLiberada = false;


  }
}