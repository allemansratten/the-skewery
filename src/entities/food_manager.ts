import 'phaser'
import { FoodItem } from '../entities/food_item'
import { FoodBase } from '../entities/food_base'
import { Ingredient, IngredientArray } from '../misc/ingredient'
import { Utils } from '../misc/utils'

export class FoodManager {

    scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        let addFoodBase = (x: number, y: number, ingredient: Ingredient): Phaser.GameObjects.Image => {
            let foodBase = new FoodBase(scene, x, y, ingredient)
            return foodBase
        }
        
        let i = 0
        for(let ingredient in IngredientArray) {
            // @ts-ignore
            addFoodBase(400+i, 400, ingredient)
            i += 64
        }
    }

    update(time: number, delta: number) {

    }
}