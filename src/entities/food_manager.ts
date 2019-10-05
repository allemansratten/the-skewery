import 'phaser'
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

        scene.input.on('dragstart', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
            gameObject.setTint(0xff0000);
        });

        scene.input.on('drag', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) {
            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        scene.input.on('dragend', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
            gameObject.clearTint();
        });

        
        let addFoodItem = (x: number, y: number, ingredient: Ingredient): Phaser.GameObjects.Image => {
            let food_item = scene.add.image(x, y, "ingredient").setInteractive();
            food_item.setFrame(Ingredient2Frame[ingredient])
            food_item.setDataEnabled()
            food_item.setData("ingredient", ingredient)

            scene.input.setDraggable(food_item);

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