import "phaser"
import { MainScene } from './scenes/main'
import { MenuScene } from './scenes/menu'
import { IntroScene } from './scenes/intro'

let gameConfig: object = {
    title: "Skewery",
    width: 900,
    height: 400,
    parent: "game_canvas",
    backgroundColor: "#000000",
    scene: [MenuScene, MainScene, IntroScene],
}

window.onload = () => {
    var game = new Phaser.Game(gameConfig)
}