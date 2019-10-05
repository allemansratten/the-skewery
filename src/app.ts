import "phaser"
import { MainScene } from './scenes/main'

let gameConfig : object = {
  title: "Spicy špízy",
  width: 900,
  height: 450,
  parent: "game_canvas",
  backgroundColor: "#bda4a4",
  scene: [MainScene],
}

window.onload = () => {
  var game = new Phaser.Game(gameConfig)
}