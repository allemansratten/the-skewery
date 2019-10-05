import 'phaser'

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

        
        let addFoodItem = (x: number, y: number): Phaser.GameObjects.Image => {
            let food_item = scene.add.image(x, y, "block").setInteractive();
            food_item.setDataEnabled()
            food_item.setData("ingredient", null) // TODO: add ingredient enum

            scene.input.setDraggable(food_item);

            return food_item
        }

        // let addBall = (x: number, y: number, r: number): Circle => {
        //     let object = scene.add.circle(x, y, r, 0xff0000)
        //     return object
        // }

        this.block = addFoodItem(400, 100);
        // this.ball = addBall(500, 100, 20);
    }

    update(time: number, delta: number) {
        this.ball.setPosition(this.ball.getCenter().x, this.ball.getCenter().y+delta*0.1)
    }
}