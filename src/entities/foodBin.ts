import 'phaser'

import { FoodItem } from './foodItem'
import { Ingredient } from '../misc/ingredient'
import { Utils } from '../misc/utils'

export class FoodBin extends Phaser.GameObjects.Image {

    ingredient: Ingredient
    foodItem: FoodItem
    scene: Phaser.Scene

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "food_bin");
        this.scene = scene
        this.setDisplaySize(80, 80)
        this.setInteractive({ dropZone: true });

        scene.add.existing(this)
    }
}