import 'phaser'

import { MainScene } from '../scenes/main'
import { FoodSpot } from './foodSpot';
import { Ingredient } from '../misc/ingredient';
import { FoodManager } from './foodManager';

export class Skewer extends Phaser.GameObjects.Image {
    localArrangement: Array<FoodSpot>

    constructor(scene: MainScene, public manager: FoodManager, x: number, y: number) {
        super(scene, x, y, 'skewer')
        this.setOrigin(0, 0)
        scene.add.existing(this)

        // Instantiate food spots
        this.localArrangement = new Array<FoodSpot>()
        for (let i = 0; i < 9; i++) {
            this.localArrangement.push(new FoodSpot(scene, 50 + x + i * 55, y + 90))
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