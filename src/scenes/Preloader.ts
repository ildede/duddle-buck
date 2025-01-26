import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2,
      'background'
    );

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(Number(this.game.config.width) / 2, Number(this.game.config.height) / 2, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(Number(this.game.config.width) / 2 - 230, Number(this.game.config.height) / 2, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + (460 * progress);
    });
  }

  preload() {
    this.load.setPath('assets');

    this.load.image('game-background', 'game-bg.png');
    this.load.image('game-background-bain', 'game-bg2.jpg');
    this.load.image('final-credits', 'final_credits.jpg');
    this.load.image('sky-clouds', 'sky_clouds.png');
    this.load.image('bubbles-cloud', 'bubbles_sky.png');
    this.load.spritesheet(
      'pump',
      'pump_sheet.png',
      {frameWidth: 460, frameHeight: 570}
    );
    this.load.image('left-bath', 'baignoire_gauche.png');
    this.load.spritesheet(
      'left-bath-water',
      'baignoire_gauche_sheet.png',
      {frameWidth: 470, frameHeight: 420}
    );
    this.load.spritesheet(
      'left-water',
      'filet_eau_gauche.png',
      {frameWidth: 64, frameHeight: 92}
    );
    this.load.image('right-bath', 'baignoire_droite.png');
    this.load.spritesheet(
      'right-bath-water',
      'baignoire_droite_sheet.png',
      {frameWidth: 524, frameHeight: 420}
    );
    this.load.spritesheet(
      'right-water',
      'filet_eau_droite.png',
      {frameWidth: 64, frameHeight: 92}
    );
    this.load.image('dart1', 'dart1.png');
    this.load.image('dart2', 'dart2.png');
    this.load.image('invisible', 'invisible.png');
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((n) => this.load.image(`bolla${n}`, `bolla${n}.png`))

    this.load.spritesheet(
      'canard1',
      'canard1.png',
      {frameWidth: 300, frameHeight: 240}
    );
    this.load.spritesheet(
      'canard2',
      'canard2.png',
      {frameWidth: 300, frameHeight: 240}
    );
    this.load.spritesheet(
      'canard3',
      'canard3.png',
      {frameWidth: 300, frameHeight: 240}
    );
    this.load.spritesheet(
      'bubble',
      'bubble_pop.png',
      {frameWidth: 356, frameHeight: 358}
    );

    this.load.audio('playing-music', 'game-music.ogg');
    this.load.audio('sarbacane', 'sarbacane.mp3');
    this.load.audio('walking-duck', 'marche_canards.mp3');
    this.load.audio('victory', 'victory.mp3');
    this.load.audio('start-music', 'start-music.wav');
    this.load.audio('patauge', 'canard_patauge.mp3');
    [1, 2, 3, 4, 5, 6].forEach((n) => this.load.audio(`couac${n}`, `couac${n}.mp3`));
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu');
  }
}
