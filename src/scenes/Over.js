class Over extends Phaser.Scene{
    constructor(){
        super('overScene')
    }
    create(){

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        console.log('Game Over')
        this.add.image(width/2, height/2-85, "titlescene").setOrigin(0.5).setScale(0.25);

    



        this.add.text(width / 2, height/2 +50, 'GAME OVER', {
            fontFamily: 'MyFont',
            fontSize: '60px',
            color: '#ffffff',  // 白文字
            stroke: '#000000', // 黒い縁取りをつける場合（オプション）
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(width / 2, height -50, 'PRESS ENTER TO RESET', {
            fontSize: '48px',
            color: '#ffffff',  // 白文字
            strokeThickness: 4
        }).setOrigin(0.5);

        this.enterKey.on('down', () => {
            this.scene.start('playScene') 
        });
    
    }

    update(){    

     
    }
}