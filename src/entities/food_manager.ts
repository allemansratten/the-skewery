import 'phaser'
import { FoodItem } from '../entities/food_item'
import { Ingredient } from '../misc/ingredient'
import { Utils } from '../misc/utils'

export class FoodManager {

    scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        
        let addFoodItem = (x: number, y: number, ingredient: Ingredient): Phaser.GameObjects.Image => {
            let food_item = new FoodItem(scene, x, y, ingredient)
            return food_item
        }

        let addFoodBase = (x: number, y: number, ingredient: Ingredient): Phaser.GameObjects.Image => {
            let food_item = scene.add.image(x, y, "ingredient_base")
            food_item.setFrame(Utils.ingredientNum(ingredient))
            food_item.setDataEnabled()
            food_item.setData("ingredient", ingredient)

            return food_item

        }
        
        addFoodItem(400, 100, Ingredient.Onion);
        addFoodBase(400, 400, Ingredient.Pepper)
    }

    update(time: number, delta: number) {

    }
}