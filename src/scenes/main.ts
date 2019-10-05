import "phaser"
import { AdjacencyRule } from "../rules/adjacencyRule";
import { Ingredient } from "../misc/ingredient";
import { FoodManager } from '../entities/food_manager'
import { Utils } from '../misc/utils'

export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    foodManager: FoodManager

    preload() {
        this.load.image('skewer', 'assets/skewer.png');
        this.load.spritesheet('ingredient', 'assets/ingredient.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ingredient_base', 'assets/ingredient_base.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        // background
        let skewer = this.add.image(450, 100, 'skewer')
        this.foodManager = new FoodManager(this)

        // Rule usage examples
        let aj = new AdjacencyRule(Ingredient.Pepper, Ingredient.Tomato)
        console.log(aj.acceptable([Ingredient.Tomato]))
        console.log(aj.acceptable([]))
        console.log(aj.acceptable([Ingredient.Pepper, Ingredient.Pepper, Ingredient.Tomato]))
    }

    update(time: number, delta: number) {
    }
}