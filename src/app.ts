import "phaser"
import { MainScene } from './scenes/main'

let gameConfig : object = {
  title: "Spicy špízy",
  width: 900,
  height: 300,
  parent: "game_canvas",
  backgroundColor: "#18216D",
  scene: [MainScene],
}

window.onload = () => {
  var game = new Phaser.Game(gameConfig)
}