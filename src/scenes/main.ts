import "phaser"
import { BallManager } from '../entities/ball_manager'

export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    ballManager: BallManager

    preload() {
        this.load.image('skewer', 'assets/skewer.png');
    }

    create() {
        // background
        let skewer = this.add.image(450, 100, 'skewer')
        skewer.setDisplaySize(800, 80)

        this.ballManager = new BallManager(this)
    }

    update(time: number, delta: number) {
        // this.ballManager.update(time, delta)
    }
}