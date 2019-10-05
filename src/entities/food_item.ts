import 'phaser'

class Vector2 extends Phaser.Math.Vector2 { }
class Image extends Phaser.GameObjects.Image { }
class Circle extends Phaser.GameObjects.Arc { }

export class FoodItem extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "ingredient");

        this.setInteractive()
        scene.input.setDraggable(this);

        this.on('dragstart', (pointer: Phaser.Input.Pointer) => {
            this.setTint(0xff0000);
        });

        this.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.x = dragX;
            this.y = dragY;
        });

        this.on('dragend', (pointer: Phaser.Input.Pointer) => {
            this.clearTint();
        });

        scene.add.existing(this)
    }
    
}