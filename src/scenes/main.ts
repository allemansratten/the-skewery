import "phaser"
import { BallManager } from '../entities/ball_manager'
import { AdjacencyRule } from "../rules/adjacencyRule";
import { Ingredient } from "../ingredient";

export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    ballManager: BallManager

    preload() {
        this.load.image('skewer', 'assets/skewer.png');
        this.load.spritesheet('ingredient', 'assets/ingredient.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        // background
        let skewer = this.add.image(450, 100, 'skewer')
        let randomitem = this.add.image(450, 100, 'ingredient')
        randomitem.setFrame(0)
        // skewer.setDisplaySize(800, 80)

        this.ballManager = new BallManager(this)

        // Rule usage examples
        let aj = new AdjacencyRule(Ingredient.Pepper, Ingredient.Tomato)
        console.log(aj.acceptable([Ingredient.Tomato]))
        console.log(aj.acceptable([]))
        console.log(aj.acceptable([Ingredient.Pepper, Ingredient.Pepper, Ingredient.Tomato]))

    }

    update(time: number, delta: number) {
        // this.ballManager.update(time, delta)
    }
}