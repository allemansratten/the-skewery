import 'phaser'

class Vector2 extends Phaser.Math.Vector2 { }
class Image extends Phaser.GameObjects.Image { }
class Circle extends Phaser.GameObjects.Arc { }

export class FoodItem extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, "box");
    }
}