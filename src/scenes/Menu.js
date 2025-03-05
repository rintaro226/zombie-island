class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }

    preload(){
        this.load.path = './assets/'

        this.load.spritesheet('hero', 'hero-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.image('tilesetImage1','tilemap_packed.png')
        this.load.image('tilesetImage2','tilemap-backgrounds_packed.png')
        this.load.tilemapTiledJSON('tilemapLevel1JSON','level1.json')
       

    }
    create(){
        console.log('menu scene')
        this.player1 = this.add.text(width/2,height/2 + 30,'1 Player',{ fontSize: '24px', fill: '#0f0' }).setOrigin(0.5)
        this.player2 = this.add.text(width/2,height/2 + 60,'2 Players',{ fontSize: '24px', fill: '#0f0' }).setOrigin(0.5)
        this.scene.start('playScene')
    }
    update(){

    }
}