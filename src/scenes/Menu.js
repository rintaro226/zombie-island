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
        this.load.image('tilesetImage1','New Piskel (4).png')
        this.load.image('titlescene','titlescene.png')
        
        this.load.image('tilesetImage2','tilemap-backgrounds_packed.png')
        // this.load.tilemapTiledJSON('tilemapLevel1JSON','level1.json')
        this.load.tilemapTiledJSON('tilemapLevel1JSON','newtilemap.json')

        //sound
        this.load.audio('backgroundMusic','MusMus-BGM-150.mp3')

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


       

    }
    create(){
        //title menu

        this.add.image(width/2, height/2-85, "titlescene").setOrigin(0.5).setScale(0.25);

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
        this.player1 = this.add.text(width/2-30,height/2 + 40,'1 Player',{ fontSize: '24px', fill: '#fff' }).setOrigin(0)
        this.player2 = this.add.text(width/2-30,height/2 + 70,'2 Players -coming soon-',{ fontSize: '24px', fill: '#fff' }).setOrigin(0)

        this.add.text(width / 2, height -50, 'Press ENTER to Start', {
            fontFamily: 'MyFont',
            fontSize: '48px',
            color: '#ffffff',  // 白文字
            stroke: '#000000', // 黒い縁取りをつける場合（オプション）
            strokeThickness: 4
        }).setOrigin(0.5);
        // this.scene.start('playScene')
        
        // triangle
        const graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });

        const centerX = width/2-50;  
        const centerY = height /2 + 50;  
        const size = 20;      

        //
        const triheight = size * Math.sqrt(3) / 2;
        const x1 = centerX + (2 / 3) * triheight;  // right egde
        const y1 = centerY;
        const x2 = centerX - (triheight / 3);
        const y2 = centerY - (size / 2);
        const x3 = centerX - (triheight / 3);
        const y3 = centerY + (size / 2);

        const triangle = new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3);

        // Triangle
        graphics.fillTriangleShape(triangle);

        // animation
        this.tweens.add({
            targets: graphics,
            alpha: { from: 1, to: 0 },
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }
    update(){
        this.enterKey.on('down', () => {
            this.scene.start('playScene') 
        });


    }
}