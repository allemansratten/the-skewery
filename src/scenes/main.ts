import "phaser"
import { Ingredient } from "../misc/ingredient";
import { FoodManager } from '../entities/foodManager'
import { RuleManager } from '../entities/ruleManager'

export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    foodManager: FoodManager
    ruleManager: RuleManager

    preload() {
        this.load.image('skewer', 'assets/skewer.png');
        this.load.image('food_spot', 'assets/food_spot.png');
        this.load.image('food_bin', 'assets/food_bin.png');
        this.load.image('background_board', 'assets/background_board.png');
        this.load.image('background_board_dark', 'assets/background_board_dark.png');
        this.load.spritesheet('ingredient', 'assets/ingredient.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ingredient_split', 'assets/ingredient_split.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ingredient_base', 'assets/ingredient_base.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        let transitionRectangle = this.add.rectangle(0, 0, 900, 400, 0x000000)
        transitionRectangle.setOrigin(0, 0)
        transitionRectangle.setDepth(1000)
        this.add.tween({
            targets: transitionRectangle,
            alpha: 0,
            duration: 700,
            onComplete: () => {
                transitionRectangle.destroy(true)
            }
        })

        this.foodManager = new FoodManager(this)
        this.ruleManager = new RuleManager(this)
    }

    update(time: number, delta: number) {
    }
}