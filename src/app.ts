import "phaser"
import { MainScene } from './scenes/main'

let gameConfig : object = {
  title: "Untitled untitled Game",
  width: 900,
  height: 300,
  parent: "game_canvas",
  backgroundColor: "#18216D",
  scene: [MainScene],
  physics: {
    default: "arcade",
    // default: "matter",
    matter: {
      debug: true,
    }
  },
}

window.onload = () => {
  var game = new Phaser.Game(gameConfig)
}