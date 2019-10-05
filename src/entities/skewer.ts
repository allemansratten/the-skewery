import 'phaser'

import { MainScene } from '../scenes/main'
import { FoodSpot } from './foodSpot';
import { Ingredient } from '../misc/ingredient';
import { FoodManager } from './foodManager';

export class Skewer extends Phaser.GameObjects.Image {
    constructor(scene: MainScene, manager: FoodManager, x: number, y: number) {
        super(scene, x, y, 'skewer')
        scene.add.existing(this)

        // Instantiate food spots
        let localArrangement = new Array<FoodSpot>()
        for (let i = 0; i < 10; i++) {
            localArrangement.push(new FoodSpot(scene, -270 + x + i * 55, y + 45))
        }
        manager.arrangement.push(localArrangement)
    }
}