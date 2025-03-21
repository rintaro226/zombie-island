class Hero extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame,direction){
        super(scene,x,y,texture,frame) //call parent class
        scene.add.existing(this)
        scene.physics.add.existing(this)// add physics body to scene

        this.body.setSize(this.width/2,this.height)//how big this character physics is
        // this.body.setCollideWorldBounds(true)
        this.body.setGravityY(800); // 重力を適用

        //addition hitbox for punch call attackHit

        this.hitbox = scene.physics.add.sprite(this.x,this.y,null)
        this.hitbox.setSize(10, 10)
        this.hitbox.setVisible(false)
        this.hitbox.setActive(false)
        this.hitbox.disableBody(true, true)

        // scene.physics.add.overlap(this.hitbox,scene.zombie,scene.attackHit,null,this)


    

        // **デバッグ用の枠線**
        

        


        //set custom Hero properties
        this.direction = direction
        this.heroVelocity = 100 //in pixel
        this.DASH = 2 // the rate to the move
        this.CDASH = 5

        this.health = 5 //HP
        

        // initialize state machine managing hero (initial state, possible states, state args[])
        scene.heroFSM = new StateMachine('idle',{
            idle : new IdleState(),
            move : new MoveState(),
            dash : new DashState(),
            punch : new PunchState(),
            cdash : new CDashState(),
            jump : new JumpState(),
            crawl : new CrawlState(),
            knockback : new KnockbackState()
        },[scene,this])// pass these as arguments to maintain scene/object context in the FSM
    }
}

class IdleState extends State{
    enter(scene,hero){
 
        hero.setVelocity(0)
        hero.anims.play(`walk-${hero.direction}`)
        hero.anims.stop()// when the animation is done
    }

    execute(scene,hero){
        // console.log('idle')
         // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const AKey = scene.keys.AKey
        const BKey = scene.keys.BKey
        const CKey = scene.keys.CKey
        const DKey = scene.keys.DKey

        if(Phaser.Input.Keyboard.JustDown(AKey)) {
            this.stateMachine.transition('punch')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('jump')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('crawl')
            return
        }

        // transition to move if pressing a movement key

        if((BKey.isDown)&&(left.isDown || right.isDown  )) {
            this.stateMachine.transition('dash')
            return
        }

        if((CKey.isDown)&&(left.isDown || right.isDown  )) {
            this.stateMachine.transition('cdash')
            return
        }

        if((left.isDown || right.isDown )) {
            this.stateMachine.transition('move')
            return
        }



    }
}


class MoveState extends State{

    execute(scene,hero){
        console.log('move')

         // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const AKey = scene.keys.AKey
        const BKey = scene.keys.BKey
        const CKey = scene.keys.CKey
        const DKey = scene.keys.DKey

        if(Phaser.Input.Keyboard.JustDown(AKey)) {
            this.stateMachine.transition('punch')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('jump')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('crawl')
            return
        }

        // transition to move if pressing a movement key

        if((BKey.isDown)&&(left.isDown || right.isDown || up.isDown || down.isDown )) {
            this.stateMachine.transition('dash')
            return
        }

        if((CKey.isDown)&&(left.isDown || right.isDown || up.isDown || down.isDown )) {
            this.stateMachine.transition('cdash')
            return
        }

        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }


        //handle movement
        let moveDirectionX = 0
        if(left.isDown){
            moveDirectionX = -1
            hero.direction = 'left'
        }else if(right.isDown){
            moveDirectionX = 1
            hero.direction = 'right'
        }

        hero.setVelocityX(hero.heroVelocity * moveDirectionX)
        hero.anims.play(`walk-${hero.direction}`, true)
        // hero.anims.play(`walk-${hero.direction}`, true) // if animation is done
    }

}


class DashState extends State{

    execute(scene,hero){
        console.log('dash')
         // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const AKey = scene.keys.AKey
        const BKey = scene.keys.BKey
        const CKey = scene.keys.CKey
        const DKey = scene.keys.DKey

        if(Phaser.Input.Keyboard.JustDown(AKey)) {
            this.stateMachine.transition('punch')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('jump')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('crawl')
            return
        }

        // transition to move if pressing a movement key
        if((left.isDown || right.isDown)&&!(BKey.isDown) ) {
            this.stateMachine.transition('move')
            return
        }

        if((CKey.isDown)&&(left.isDown || right.isDown )) {//cdush is stronger than b dash
            this.stateMachine.transition('cdash')
            return
        }

        if(!(left.isDown || right.isDown )) {
            this.stateMachine.transition('idle')
            return
        }




        //handle movement
        let moveDirectionX = 0
        if(left.isDown){
            moveDirectionX = -1
            hero.direction = 'left'
        }else if(right.isDown){
            moveDirectionX = 1
            hero.direction = 'right'
        }

        hero.setVelocityX(hero.heroVelocity * moveDirectionX * hero.DASH)
        hero.anims.play(`walk-${hero.direction}`, true) // if animation is done
    }

}

class CDashState extends State{

    execute(scene,hero){
        console.log('cdash')
        const { left, right, up, down, space, shift } = scene.keys
        const AKey = scene.keys.AKey
        const BKey = scene.keys.BKey
        const CKey = scene.keys.CKey
        const DKey = scene.keys.DKey

        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle')
            return

                

        }
        else if((left.isDown || right.isDown)&&!(CKey.isDown) ) {
            this.stateMachine.transition('move')
            return
        }


        //handle movement
        let moveDirectionX = 0
        if(left.isDown){
            moveDirectionX = -1
            hero.direction = 'left'
        }else if(right.isDown){
            moveDirectionX = 1
            hero.direction = 'right'
        }

        hero.setVelocityX(hero.heroVelocity * moveDirectionX * hero.CDASH)

        hero.anims.play(`walk-${hero.direction}`, true) // if animation is done

    }


}

class PunchState extends State{
    enter(scene, hero) {
        console.log('punch')
        hero.setVelocity(0)
        hero.anims.play(`punch-${hero.direction}`)

        //punch set
        hero.hitbox.setPosition(
            hero.x + (hero.direction === 'right' ? 30 : -30),
            hero.y
        )
        hero.hitbox.setActive(true)
        hero.hitbox.setVisible(true);
        hero.hitbox.enableBody(true, hero.hitbox.x, hero.hitbox.y, true, true)
        // hero.hitbox.enableBody(true, true)



        hero.once('animationcomplete', () => {

            hero.hitbox.setActive(false);
            hero.hitbox.setVisible(false);
            hero.hitbox.disableBody(true, true)
            

            this.stateMachine.transition('idle')
        })
        }
    }

class CrawlState extends State{
        enter(scene, hero) {
            console.log('crawl')
            hero.setVelocity(0)

            hero.anims.play(`crawl-${hero.direction}`)

            hero.body.setSize(hero.width, hero.height / 2)
            hero.body.offset.y = hero.height / 2
            
            }
        execute(scene, hero){
            const { left, right, up, down, space, shift } = scene.keys
            const AKey = scene.keys.AKey
            const BKey = scene.keys.BKey
            const CKey = scene.keys.CKey
            const DKey = scene.keys.DKey

            if(!(down.isDown)){
                hero.body.setSize(hero.width/2, hero.height);
                hero.body.offset.y = 0
                this.stateMachine.transition('idle')

                return

            }
        }

        
    
    }

    class JumpState extends State {
        enter(scene, hero) {
            hero.setVelocityY(-300); // ジャンプ力（負の値で上方向）
            // hero.anims.play(`jump-${hero.direction}`, true);
            
        }
    
        execute(scene, hero) {
            if (hero.body.blocked.down) { // 着地したら `idle` に戻る
                this.stateMachine.transition('idle')
                return
            }
            const { left, right, up, down, space, shift } = scene.keys
            const AKey = scene.keys.AKey
            const BKey = scene.keys.BKey
            const CKey = scene.keys.CKey
            const DKey = scene.keys.DKey
            

            //handle movement
            let moveDirectionX = 0
            if(left.isDown){
                moveDirectionX = -1
                hero.direction = 'left'
            }else if(right.isDown){
                moveDirectionX = 1
                hero.direction = 'right'
            }

            hero.setVelocityX(hero.heroVelocity * moveDirectionX)
            hero.anims.play(`jump-${hero.direction}`, true) // if animation is done
        }
    }

    class KnockbackState extends State{
        enter(scene,hero,direction){
            if(hero.health > 0){
                console.log('KnockbackState');
                console.log(direction)
    
                const knockbackPower = 200
                hero.setVelocityX(direction*knockbackPower)
                hero.setTint(0xff0000)
    
                scene.time.delayedCall(300, () => {
                    hero.clearTint();
                    this.stateMachine.transition('idle');
                });

            }else{
                hero.destroy()
                scene.scene.start('overScene')
                scene.backgroundMusic.stop();
            }
   
        }

        execute(scene,hero){

        }
    }




