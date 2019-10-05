import 'phaser'

class Vector2 extends Phaser.Math.Vector2 { }
class Image extends Phaser.GameObjects.Image { }
class Circle extends Phaser.GameObjects.Arc { }

export class FoodSpot extends Phaser.GameObjects.Image {
    zone: Phaser.GameObjects.Zone

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "todo")

        this.setInteractive({ dropZone: true });

        // let width = 50, height = 50
        // this.zone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height);

        // debug rect around zone
        // var graphics = scene.add.graphics();
        // graphics.lineStyle(2, 0xffff00);
        // graphics.strokeRect(this.zone.x - this.zone.input.hitArea.width / 2, this.zone.y - this.zone.input.hitArea.height / 2, this.zone.input.hitArea.width, this.zone.input.hitArea.height);
        
        scene.add.existing(this)
    }
}