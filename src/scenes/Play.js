class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    create(){

        //sound
        // if (!this.sound.get('backgroundMusic')) {
        //     this.backgroundMusic = this.sound.add('backgroundMusic', {
        //         loop: true,
        //         volume: 0.2
        //     });
        //     this.backgroundMusic.play();
        // }
        this.sound.stopAll();
        this.backgroundMusic = this.sound.add('backgroundMusic', {
            loop: true,
            volume: 0.2
        });
        this.backgroundMusic.play();

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keys.BKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
        this.keys.CKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.keys.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        //create the tilemap
        const map =  this.add.tilemap('tilemapLevel1JSON')
        const tileset1 = map.addTilesetImage('New Piskel (4)','tilesetImage1')
        const tileset2 = map.addTilesetImage('tilemap-backgrounds_packed','tilesetImage2')
        const tileset = [tileset1,tileset2]

        // const bgLayer = map.createLayer('Background',tileset,0,0)
        const sky =map.createLayer('sky',tileset,0,0)
        const groundLayer = map.createLayer('Ground',tileset,0,0)
        // const treeLayer = map.createLayer('Trees',tileset,0,0)

        const heroSpawn = map.findObject('Spawns',(obj) => obj.name === 'heroSpawn')

        //set collision
        groundLayer.setCollisionByProperty({collides: true})



      // add new Hero to scene (scene, x, y, key, frame, direction) 
        this.hero = new Hero(this, heroSpawn.x, heroSpawn.y, 'hero', 0, 'right')

        //make zombies group
        this.zombies = this.physics.add.group()

        const spawnPoints = map.getObjectLayer('ZombieSpawns').objects
        spawnPoints.forEach(spawnPoint =>{
            const zombie = new Zombie(this,spawnPoint.x,spawnPoint.y,'hero',0,'left').setOrigin(0.5,0.5)
            this.zombies.add(zombie)
        })
        // this.zombie = new Zombie(this,300,150,'hero',0,'right')

        



        //physics　
        this.physics.add.collider(this.hero,groundLayer)
        this.physics.add.collider(this.zombies,groundLayer)
        // camera
        this.cameras.main.setBounds(0,0,map.widthInPixels,map.heightInPixels)
        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels)
        this.cameras.main.startFollow(this.hero,true,0.25,0.25)


        //when zombies touch the hero

        this.physics.add.collider(this.hero,this.zombies,this.handlePlayerHit,null,this)//call the function

        this.physics.add.overlap(this.hero.hitbox,this.zombies,this.attackHit,null,this)

        
        console.log("play scene")



    
    }
    update() {
        // make sure we step (ie update) the hero's state machine
        this.heroFSM.step()
        this.zombies.children.iterate(zombie => {
            if(zombie){
                zombie.update()
            }
        })

        if(this.hero.y>height+10){
            this.hero.destroy()
            this.scene.start('overScene')
            this.backgroundMusic.stop();
        }
    }
        


    handlePlayerHit(hero,zombie){
        console.log("hit")
        // if ( !hero.stateMachine) {
        //     console.warn('Hero or stateMachine is undefined!');
        //     return;
        // }

        //damage
        hero.health -= 1
        console.log(hero.health)
      
        //knock back
        const knockbackDirection = (hero.x < zombie.x) ? -1 : 1;

        this.heroFSM.transition('knockback', knockbackDirection);


            
    }
    attackHit(hitbox,zombie){
        console.log('attack!')
        zombie.takeDamage(1)
        this.hero.hitbox.setActive(false)
        this.hero.hitbox.setVisible(false)
        this.hero.hitbox.disableBody(true, true)
    }


}