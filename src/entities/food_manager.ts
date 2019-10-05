import 'phaser'
import { FoodItem } from '../entities/food_item'
import { Ingredient } from '../misc/ingredient'

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

        // let addBall = (x: number, y: number, r: number): Circle => {
        //     let object = scene.add.circle(x, y, r, 0xff0000)
        //     return object
        // }

        this.block = addFoodItem(400, 100, Ingredient.Onion);
        // this.ball = addBall(500, 100, 20);
    }

    update(time: number, delta: number) {
        this.ball.setPosition(this.ball.getCenter().x, this.ball.getCenter().y+delta*0.1)
    }
}