import 'phaser'

import { FoodItem } from './foodItem'
import { Ingredient } from '../misc/ingredient'
import { Utils } from '../misc/utils'
import { FoodManager } from './foodManager'

export class FoodBase extends Phaser.GameObjects.Image {

    ingredient: Ingredient
    foodItem: FoodItem
    foodManager: FoodManager
    scene: Phaser.Scene
    x: number
    y: number

    constructor(scene: Phaser.Scene, x: number, y: number, ingredient: Ingredient, foodManager: FoodManager) {
        super(scene, x, y, "ingredient_base");
        this.setFrame(Utils.ingredientNum(ingredient))
        scene.add.existing(this)

        this.ingredient = ingredient
        this.foodManager = foodManager
        this.scene = scene
        this.x = x
        this.y = y

        this.instantiateNew()
    }
    
    public instantiateNew() {
        this.foodItem = new FoodItem(this.scene, this.x, this.y, this.ingredient, this, this.foodManager)
    }
}