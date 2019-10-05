import 'phaser'
import { FoodItem } from '../entities/food_item'
import { Ingredient, Ingredient2Frame } from '../misc/ingredient'

class Vector2 extends Phaser.Math.Vector2 { }
class Image extends Phaser.GameObjects.Image { }
class Circle extends Phaser.GameObjects.Arc { }

export class FoodManager {

    scene: Phaser.Scene
    block: Image
    ball: Circle

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        
        let addFoodItem = (x: number, y: number, ingredient: Ingredient): Phaser.GameObjects.Image => {
            let food_item = new FoodItem(scene, x, y, ingredient)
            return food_item
        }

        let addFoodBase = (x: number, y: number, ingredient: Ingredient): Phaser.GameObjects.Image => {
            let food_item = scene.add.image(x, y, "ingredient_base")
            food_item.setFrame(Ingredient2Frame[ingredient])
            food_item.setDataEnabled()
            food_item.setData("ingredient", ingredient)

            return food_item
        }

        this.block = addFoodItem(400, 100, Ingredient.Onion);

        addFoodBase(400, 400, Ingredient.Pepper)
    }

    update(time: number, delta: number) {

    }
}