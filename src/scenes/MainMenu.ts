import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
  background: GameObjects.Image;

  gamestart: GameObjects.Image;
  credits: GameObjects.Image;
  sdb: GameObjects.Image;
  cabane: GameObjects.Image;
  realduck: GameObjects.Image;
  plasticduck: GameObjects.Image;

  title: GameObjects.Text;
  private music: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private cabaneSelected: boolean = true;

  constructor() {
    super('MainMenu');
  }

  create() {
    this.music = this.sound.add('start-music');
    this.music.play({loop: true});

    this.background = this.add.image(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height) / 2,
      'background'
    );

    this.gamestart = this.add.sprite(
      Number(this.game.config.width) / 2 - 155,
      Number(this.game.config.height) - 220,
      'credits',
      0
    ).on('pointerdown', () => {
      this.music.stop();
      this.music.destroy();
      this.scene.start('Game', { cabaneSelected: this.cabaneSelected })
    });

    this.gamestart.on('pointerover', () => {
      this.gamestart.setFrame(1);
    })
    this.gamestart.on('pointerout', () => {
      this.gamestart.setFrame(0)
    })

    this.gamestart.setInteractive();

    this.credits = this.add.sprite(
      Number(this.game.config.width) / 2 + 155,
      Number(this.game.config.height) - 220,
      'credits',
      2
    ).on('pointerdown', () => {
      this.music.stop();
      this.music.destroy();
      this.scene.start('Credits')
    });
    this.credits.setInteractive();

    this.credits.on('pointerover', () => {
      this.credits.setFrame(3);
    })
    this.credits.on('pointerout', () => {
      this.credits.setFrame(2)
    })

    this.cabaneSelected = true;
    this.sdb = this.add.sprite(
      Number(this.game.config.width) / 2 - 250,
      Number(this.game.config.height) - 470,
      'baignoires',
      0
    ).setAlpha(0.5);
    this.sdb.setInteractive();
    this.sdb.on('pointerdown', () => {
      this.cabaneSelected = false;
      this.sdb.setAlpha(1);
      this.cabane.setAlpha(0.5);
    });
    this.cabane = this.add.sprite(
      Number(this.game.config.width) / 2 + 250,
      Number(this.game.config.height) - 470,
      'baignoires',
      1
    );
    this.cabane.setInteractive();
    this.cabane.on('pointerdown', () => {
      this.cabaneSelected = true;
      this.sdb.setAlpha(0.5);
      this.cabane.setAlpha(1);
    });

    this.realduck = this.add.image(
      Number(this.game.config.width) / 2 - 200,
      Number(this.game.config.height) - 700,
      'realduck'
    );

    this.plasticduck = this.add.image(
      Number(this.game.config.width) / 2 + 200,
      Number(this.game.config.height) - 700,
      'plasticduck'
    );
  }
}
