class Hero extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame,direction){
        super(scene,x,y,texture,frame) //call parent class
        scene.add.existing(this)
        scene.physics.add.existing(this)// add physics body to scene

        this.body.setSize(this.width/2,this.height/2)//how big this character physics is
        this.body.setCollideWorldBounds(true)
        this.body.setGravityY(800); // 重力を適用

        // **デバッグ用の枠線**
        
        


        //set custom Hero properties
        this.direction = direction
        this.heroVelocity = 100 //in pixel
        this.DASH = 2 // the rate to the move
        this.CDASH = 5
        

        // initialize state machine managing hero (initial state, possible states, state args[])
        scene.heroFSM = new StateMachine('idle',{
            idle : new IdleState(),
            move : new MoveState(),
            dash : new DashState(),
            punch : new PunchState(),
            cdash : new CDashState(),
            jump : new JumpState(),
            crawl : new CrawlState()
        },[scene,this])// pass these as arguments to maintain scene/object context in the FSM
    }
}

class IdleState extends State{
    enter(scene,hero){
        hero.setVelocity(0)
        // hero.anims.play(`walk-${hero.direction}`)
        // hero.anims.stop()// when the animation is done
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
        // hero.anims.play(`walk-${hero.direction}`, true) // if animation is done
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

        // hero.anims.play(`walk-${hero.direction}`, true) // if animation is done

    }


}

class PunchState extends State{
    enter(scene, hero) {
        console.log('punch')
        hero.setVelocity(0)
        // hero.anims.play(`swing-${hero.direction}`)
        this.stateMachine.transition('idle')
        hero.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
        }
    }

class CrawlState extends State{
        enter(scene, hero) {
            console.log('crawl')
            hero.setVelocity(0)
            // hero.anims.play(`swing-${hero.direction}`)
            
            }
        execute(scene, hero){
            const { left, right, up, down, space, shift } = scene.keys
            const AKey = scene.keys.AKey
            const BKey = scene.keys.BKey
            const CKey = scene.keys.CKey
            const DKey = scene.keys.DKey

            if(!(down.isDown)){
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
            // hero.anims.play(`walk-${hero.direction}`, true) // if animation is done
        }
    }




