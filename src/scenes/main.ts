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
        this.load.spritesheet('ingredient_base', 'assets/ingredient_base.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.foodManager = new FoodManager(this)
        this.ruleManager = new RuleManager(this)
    }

    update(time: number, delta: number) {
    }
}