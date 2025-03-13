class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }

    preload(){
        this.load.path = './assets/'

        this.load.spritesheet('hero', 'Hero.png', {
            frameWidth: 64,
            frameHeight: 64,
        })
        this.load.image('tilesetImage1','tilemap_packed.png')
        this.load.image('tilesetImage2','tilemap-backgrounds_packed.png')
        this.load.tilemapTiledJSON('tilemapLevel1JSON','level1.json')
       

    }
    create(){
        this.anims.create({
            key: 'walk-right',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
        })
        this.anims.create({
            key: 'jump-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 8 }),
        })
        this.anims.create({
            key: 'punch-right',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 9, end: 10 }),
        })
        this.anims.create({
            key: 'crawl-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 11, end: 11 }),
        })
        this.anims.create({
            key: 'jump-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 12}),
        })
        this.anims.create({
            key: 'punch-left',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 13, end: 14 }),
        })
        this.anims.create({
            key: 'crawl-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 15, end: 15 }),
        })


        console.log('menu scene')
        this.player1 = this.add.text(width/2,height/2 + 30,'1 Player',{ fontSize: '24px', fill: '#0f0' }).setOrigin(0.5)
        this.player2 = this.add.text(width/2,height/2 + 60,'2 Players',{ fontSize: '24px', fill: '#0f0' }).setOrigin(0.5)
        this.scene.start('playScene')
    }
    update(){

    }
}