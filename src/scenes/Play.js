class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    create(){
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keys.BKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
        this.keys.CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.keys.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        //create the tilemap
        const map =  this.add.tilemap('tilemapLevel1JSON')
        const tileset1 = map.addTilesetImage('tilemap_packed','tilesetImage1')
        const tileset2 = map.addTilesetImage('tilemap-backgrounds_packed','tilesetImage2')
        const tileset = [tileset1,tileset2]

        const bgLayer = map.createLayer('Background',tileset,0,0)
        const groundLayer = map.createLayer('Ground',tileset,0,0)
        const treeLayer = map.createLayer('Trees',tileset,0,0)

        //set collision
        groundLayer.setCollisionByProperty({collides: true})



      // add new Hero to scene (scene, x, y, key, frame, direction) 
        this.hero = new Hero(this, 200, 150, 'hero', 0, 'right')



        //physics　
        this.physics.add.collider(this.hero,groundLayer)
        // camera
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels)
        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels)
        this.cameras.main.startFollow(this.hero,true,0.25,0.25)
        
        console.log("play scene")


    
    }
    update() {
        // make sure we step (ie update) the hero's state machine
        this.heroFSM.step()
    }
}