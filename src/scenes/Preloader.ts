import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, 'background');

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + (460 * progress);
    });
  }

  preload() {
    this.load.setPath('assets');

    this.load.image('game-background', 'game-bg.png');
    this.load.image('pump', 'pump.png');
    this.load.image('left-bath', 'baignoire_gauche.png');
    this.load.image('right-bath', 'baignoire_droite.png');
    this.load.image('dart1', 'dart1.png');
    this.load.image('dart2', 'dart2.png');
    this.load.image('invisible', 'invisible.png');

    this.load.spritesheet(
      'canard1',
      'canard1.png',
      { frameWidth: 300, frameHeight: 240 }
    );
    this.load.spritesheet(
      'canard2',
      'canard2.png',
      { frameWidth: 300, frameHeight: 240 }
    );
    this.load.spritesheet(
      'bubble',
      'bubble_pop.png',
      { frameWidth: 356, frameHeight: 358 }
    );

    this.load.audio('playing-music', 'game-music.ogg');
    this.load.audio('sarbacane', 'sarbacane.mp3');
    this.load.audio('walking-duck', 'marche_canards.mp3');
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu');
  }
}
