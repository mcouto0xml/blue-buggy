// Ending cutscene and explanation
var botaoIniciar, botaoOpcoes, botaoCreditos

class menuInicial extends Phaser.Scene {
    constructor() {
        super('menuInicial');
    }

    preload() {
        this.load.image('logo', 'assets/Menu/logo.png')

        // Botões

        this.load.image('iniciar', 'assets/Menu/Iniciar.png')
        this.load.image('creditos', 'assets/Menu/Creditos.png')
        this.load.image('opcoes', 'assets/Menu/Opcoes.png')

        // Fundos

        this.load.image('fundo', 'assets/Estrada/fundo.png')
        this.load.image('nuvens', 'assets/Estrada/nuvens.png')
        this.load.image('ruas', 'assets/Estrada/ruas.png')

        // Sons

        this.load.audio('soundtrack1', 'assets/audios/soundtrack1.mp3')
    }

    create() {

        // CAMERA 
        this.soundtrack1 = this.sound.add('soundtrack1', { loop: true, volume: 0.1 });
        this.soundtrack1.play();
        this.cameras.main.fadeIn(1000);

        // SONS

       
        // FUNDO 

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


        this.add.image(260, 160, 'logo').setScale(0.6)

        botaoIniciar = this.add.image(200, 320, 'iniciar').setScale(0.5).setInteractive({ useHandCursor: true }).setDepth(10);
        botaoOpcoes = this.add.image(200, 420, 'opcoes').setScale(0.5).setInteractive({ useHandCursor: true }).setDepth(10);
        botaoCreditos = this.add.image(200, 520, 'creditos').setScale(0.5).setInteractive({ useHandCursor: true }).setDepth(10);


        let botoes = [botaoIniciar, botaoCreditos, botaoOpcoes]

        botoes.forEach((botao) => {
            botao.on('pointerover', () => {
                this.tweens.add({ // adiciona animação
                    targets: botao, // Define que a animação é para o botaoVivo
                    scale: 0.54, // Aumenta o tamanho do botão
                    duration: 200, // Define a duração da animação como 0.2 segundos
                    ease: 'Linear' // Define o movimento da animação como linear(constante)
                });
            });

            // Se o mouse não estiver sobre o botaoVivo, o escopo abaixo será executado
            botao.on('pointerout', () => {
                this.tweens.add({ // adiciona animação
                    targets: botao, // Define que a animação é para o botaoVivo
                    scale: 0.5, // Diminui o tamanho do botão para o normal
                    duration: 200, // Define a duração da animação como 0.2 segundos
                    ease: 'Linear' // Define o movimento da animação como linear(constante)
                });
            });
            if (botao == botaoIniciar) {
                botao.on('pointerdown', () => {
                    this.cameras.main.fadeOut(1000);
                    this.time.addEvent({
                        delay: 1000, // Tempo em milissegundos (2 segundos)
                        callback: () => {
                            this.scene.start('FasePrincipal'); // Inicia a tela de configuração
                        }
                    })
                });
            }
        })

    }

    update() {
        // Estrada andando
        this.fundo.tilePositionX -= 2;
        this.ruas.tilePositionX -= 6;
    }
}