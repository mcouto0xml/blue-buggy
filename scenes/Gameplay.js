


// Main gameplay scene
class FasePrincipal extends Phaser.Scene {
  constructor() {
    super('FasePrincipal');
  }

  preload() {
    // Carregar sprites dos carros
    this.load.image('carroVermelho', 'assets/Jogabilidade/carro1.png');
    this.load.image('fuscaAzul', 'assets/fusca.png');

    // Carregar Imagem dos Players

    this.load.image('P1', 'assets/Jogabilidade/Personagem1.png')
    this.load.image('P2', 'assets/Jogabilidade/Personagem2.png')

    // Menu

    this.load.image('P1_fundo', 'assets/Jogabilidade/P1_fundo.png')

    this.load.image('soco', 'assets/Jogabilidade/soco.png')

    // Carregar áudios
    this.load.audio('carRide', 'assets/audios/car-ride.mp3');
    this.load.audio('radio', 'assets/audios/radio.mp3');
  }

  create() {
    // Pontuação
    this.pontos = { j1: 0, j2: 0 };


    // Barras
    this.perso1_fundo = this.add.image(140, 60, 'P1_fundo').setScale(1)

    this.perso1 = this.add.image(70, 53, 'P1').setScale(0.45)
    this.textoPontoJ1 = this.add.text(180, 28, '0', { fontFamily: "ByteBounce", fontSize: '48px', fill: '#fff' });
    this.textoPontoJ2 = this.add.text(1240, 28, '0', { fontSize: '48px', fill: '#fff' });

    this.soco = this.add.image(145, 55, 'soco').setScale(0.08)
    // Teclas para cada jogador
    this.teclaJ1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Jogador 1 aperta "A"
    this.teclaJ2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L); // Jogador 2 aperta "L"

    // Flag se fusca está na tela
    this.fuscaNaTela = false;

    // Adicionar áudios em loop
  this.carRideAudio = this.sound.add('carRide', { loop: true, volume: 1 });
  this.radioAudio = this.sound.add('radio', { loop: true, volume: 0.2 });
    this.carRideAudio.play();
    this.radioAudio.play();
    this.reacaoLiberada = false;


    let SpawnVelo = [2000, 1500, 1300]
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

    let posicoes = [400, 600];
    let velocidades = [-500, -450, -400]

    let velo = Phaser.Math.RND.pick(velocidades);
    let posY = Phaser.Math.RND.pick(posicoes);

    let carro = this.add.sprite(1280, posY, tipo).setScale(0.5); // aparece à direita
    this.physics.add.existing(carro);

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

    if (this.pontos.j1 == 5 || this.pontos.j2 == 5){

    }
  }

  atribuiPonto(jogador) {
    this.textoPontoJ1.setText(`${this.pontos.j1}`);
    this.textoPontoJ2.setText(`${this.pontos.j2}`);
    this.fuscaNaTela = false;
    this.reacaoLiberada = false;
  }
}