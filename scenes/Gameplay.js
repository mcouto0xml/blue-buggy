


// Main gameplay scene
class FasePrincipal extends Phaser.Scene {
  constructor() {
    super('FasePrincipal');
  }

  preload() {


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


    // Carregar sprites dos carros
    this.load.image('carroVermelho', 'assets/Jogabilidade/carro1.png');
    this.load.image('fuscaAzul', 'assets/fusca.png');
    this.load.spritesheet("npc_one", "assets/sprites/vincente.png", { frameWidth: 56, frameHeight: 84 })


    // Carregar Imagem dos Players

    this.load.image('P1', 'assets/Jogabilidade/P1.png')
    this.load.image('P2', 'assets/Jogabilidade/P2.png')


    // Menu

    this.load.image('P1_fundo', 'assets/Jogabilidade/P1_fundo.png')

    this.load.image('soco', 'assets/Jogabilidade/soco.png')

    // Carregar áudios
    this.load.audio('carRide', 'assets/audios/car-ride.mp3');
    this.load.audio('radio', 'assets/audios/radio.mp3');
  }

  create() {

    this.cameras.main.fadeIn(1000);
    // Pontuação
    this.pontos = { j1: 0, j2: 0 };
    this.perso1 = this.add.image(70, 50, 'P1').setScale(0.45)
    this.perso2 = this.add.image(1090, 50, 'P2').setScale(0.45)

    this.textoPontoJ1 = this.add.text(160, 28, '0', { fontFamily: "ByteBounce", fontSize: '48px', fill: '#fff' });
    this.textoPontoJ2 = this.add.text(1190, 28, '0', { fontFamily: "ByteBounce", fontSize: '48px', fill: '#fff' });

    this.soco = this.add.image(135, 55, 'soco').setScale(0.1)
    this.soco2 = this.add.image(1165, 55, 'soco').setScale(0.1)
    // Teclas para cada jogador
    this.teclaJ1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Jogador 1 aperta "A"
    this.teclaJ2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L); // Jogador 2 aperta "L"

    // Flag se fusca está na tela
    this.fuscaNaTela = false;



    this.carRideAudio = this.sound.add('carRide', { loop: true, volume: 0.5 });
    this.radioAudio = this.sound.add('radio', { loop: true, volume: 0.2 });


    this.carRideAudio.play();

    this.time.addEvent({
      delay: 20000, // Tempo em milissegundos (2 segundos)
      callback: () => {
        this.radioAudio.play(); // Inicia a tela de configuração
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
  }

  spawnCarro() {


    // Decide aleatoriamente se será fusca ou carro comum
    let ehFusca = Phaser.Math.Between(0, 10) === 0; // 20% de chance
    let tipo = ehFusca ? 'fuscaAzul' : 'carroVermelho';

    let velocidades = [-500, -450, -400]
    let Y = [650, 675]

    let velo = Phaser.Math.RND.pick(velocidades);
    let PosY = Phaser.Math.RND.pick(Y);

    let carro = this.add.sprite(1280, PosY, tipo).setScale(0.3).setDepth(20); // aparece à direita
    this.physics.add.existing(carro);

    if (PosY == 675){
      carro.setDepth(21)
    }
    carro.body.setVelocityX(velo); // anda para esquerda
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
      // Destruir quando sair da tela
      carro.once('update', () => {
        if (carro.x < -50) carro.destroy();
      });
    }
  }

  update() {
    if (this.reacaoLiberada) {
      if (Phaser.Input.Keyboard.JustDown(this.teclaJ1)) {
        this.pontos.j1++;
        this.atribuiPonto(1);
      } else if (Phaser.Input.Keyboard.JustDown(this.teclaJ2)) {
        this.pontos.j2++;
        this.atribuiPonto(2);
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