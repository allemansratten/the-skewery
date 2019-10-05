import 'phaser'
import { FoodItem } from './foodItem'

export class FoodSpot extends Phaser.GameObjects.Image {
    zone: Phaser.GameObjects.Zone
    currentFoodItem: FoodItem
    hover: boolean

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "food_spot")

        this.setInteractive({ dropZone: true })
        this.setDisplaySize(55, 55)
        this.hover = false

        // let width = 50, height = 50
        // this.zone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height);

        // debug rect around zone
        // var graphics = scene.add.graphics();
        // graphics.lineStyle(2, 0xffff00);
        // graphics.strokeRect(this.zone.x - this.zone.input.hitArea.width / 2, this.zone.y - this.zone.input.hitArea.height / 2, this.zone.input.hitArea.width, this.zone.input.hitArea.height);
        
        scene.add.existing(this)
    }

    public isFree(): boolean {
        return this.currentFoodItem === undefined
    }

    public die(): void {
        this.destroy(true)
        if(!this.isFree()) {
            this.currentFoodItem.destroy(true)
        }
    }
}