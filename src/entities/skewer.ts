import 'phaser'

import { MainScene } from '../scenes/main'
import { FoodSpot } from './foodSpot';
import { Ingredient } from '../misc/ingredient';
import { FoodManager } from './foodManager';

export class Skewer extends Phaser.GameObjects.Image {
    localArrangement: Array<FoodSpot>

    constructor(scene: MainScene, public manager: FoodManager, x: number, y: number) {
        super(scene, x, y, 'skewer')
        scene.add.existing(this)

        // Instantiate food spots
        this.localArrangement = new Array<FoodSpot>()
        for (let i = 0; i < 10; i++) {
            this.localArrangement.push(new FoodSpot(scene, -270 + x + i * 55, y + 45))
        }
        manager.arrangement.push(this.localArrangement)
    }

    public die() {
        this.destroy(true)
        for (let i of this.localArrangement) {
            i.die()
        }
    }
}