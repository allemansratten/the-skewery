import 'phaser'

import { Ingredient } from '../misc/ingredient'
import { Utils } from '../misc/utils'

export class FoodBase extends Phaser.GameObjects.Image {

    ingredient: Ingredient

    constructor(scene: Phaser.Scene, x: number, y: number, ingredient: Ingredient) {
        super(scene, x, y, "ingredient_base");

        this.setFrame(Utils.ingredientNum(ingredient))
        this.ingredient = ingredient

        scene.add.existing(this)
    }
    
}