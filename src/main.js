console.log('hello world')
let config ={
    type: Phaser.AUTO,
    width:640,
    height:480,
    scene:[ Menu, Play, Over],
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
}
let game = new Phaser.Game(config)

let width = config.width
let height = config.height
let keyRIGHT, keyLEFT, keyUP, keyDOWN, keyA, keyB, keyC, keyD