class Zombie extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame,directon){
        super(scene,x,y,texture,frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setVelocityX(0)
        this.body.setGravityY(800); // 重力を適用
        this.body.setSize(this.width/4,this.height)//how big this character physics is

        this.player = scene.hero
        this.speed = 20

        this.health = 2


        // this.play('zombieSpawn')
        // this.once('animationcomplete',()=>{
        //     this.setVelocityX(-50)
        //     this.play('zombieWalk')
        // })
    }

    update(){
        this.body.setGravityY(800); // 重力を適用
        if (!this.active) {  // すでに destroy されていたら処理しない
            return;
        }
        if(!this.player) return;

        if(this.x + 10 <this.player.x){
            this.setVelocityX(this.speed)
            this.flipX = false
        
        }else if(this.player.x+10 <this.x)
        {
            this.setVelocityX(-this.speed)
            this.flipX =true
        }else{
            this.setVelocityX(0)
        }

    }

    takeDamage(damage){
        this.health -= damage
        console.log(`Zombie HP: ${this.health}`);
        if(this.health<= 0){
            this.die()
        }
    }

    die(){
        console.log("Zombie dies!");
        // this.setVelocity(0);
        // this.anims.play('zombieDeath');
        this.destroy()

        // // **アニメーション完了後に削除**
        // this.once('animationcomplete', () => {
        //     this.destroy();
        // });
    }
}