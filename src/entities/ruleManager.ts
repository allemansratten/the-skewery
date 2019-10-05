import 'phaser'

export class RuleManager {

    scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        let backgroundBoard = scene.add.image(10, 10, 'background_board_dark')
        backgroundBoard.setOrigin(0, 0)
        backgroundBoard.setDisplaySize(250, 380)
        backgroundBoard.setAlpha(0.5)
    }
}