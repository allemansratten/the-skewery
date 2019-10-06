import "phaser"
import { MainScene } from './scenes/main'

let gameConfig: object = {
    title: "Skewed",
    width: 900,
    height: 400,
    parent: "game_canvas",
    backgroundColor: "#000000",
    scene: [MainScene],
}

window.onload = () => {
    var game = new Phaser.Game(gameConfig)
}