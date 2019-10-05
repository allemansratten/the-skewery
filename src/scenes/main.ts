import "phaser"
import { BallManager } from '../entities/ball_manager'

export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    ballManager: BallManager

    create() {
        this.ballManager = new BallManager(this)
    }

    update(time: number, delta: number) {
        this.ballManager.update(time, delta)
    }
}