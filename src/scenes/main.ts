import "phaser"
import { FoodManager } from '../entities/food_manager'

export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    foodManager: FoodManager

    preload() {
        this.load.image('skewer', 'assets/skewer.png');
    }

    create() {
        // background
        let skewer = this.add.image(450, 100, 'skewer')
        skewer.setDisplaySize(800, 80)

        this.foodManager = new FoodManager(this)
    }

    update(time: number, delta: number) {
        // this.ballManager.update(time, delta)
    }
}