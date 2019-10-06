import 'phaser'

import { MainScene } from '../scenes/main'
import { FoodSpot } from './foodSpot';
import { FoodManager } from './foodManager';
import { FoodItem } from './foodItem';
import { Utils } from '../misc/utils';
import { Level } from '../rules/level';

export class Skewer extends Phaser.GameObjects.Image {
    localArrangement: Array<FoodSpot>

    constructor(public scene: MainScene, public manager: FoodManager, x: number, y: number, level: Level) {
        super(scene, x, y, 'skewer')
        this.setOrigin(0, 0)
        scene.add.existing(this)
        this.setAlpha(0)
        scene.add.tween({
            targets: this,
            alpha: { from: 0, to: 1 },
            duration: 700,
        })

        // Instantiate food spots
        this.localArrangement = new Array<FoodSpot>()
        for (let i = 0; i < level.spots; i++) {
            this.localArrangement.push(new FoodSpot(scene, (9-level.spots)*55+ 50 + x + i * 55, y + 90))
        }
        manager.arrangement.push(this.localArrangement)
    }

    public die(onComplete: () => void): Phaser.Tweens.Tween {
        let foodItems: Array<FoodItem> = new Array<FoodItem>()
        for (let spot of this.localArrangement) {
            spot.setInteractive({ dropZone: false })

            this.scene.tweens.add({
                targets: spot,
                alpha: { from: 1, to: 0 },
                duration: 300,
                onComplete: () => {
                    spot.destroy(true)
                }
            })
            if (!spot.isFree()) {
                spot.currentFoodItem.setInteractive({
                    draggable: false
                })
                spot.currentFoodItem.off('dragstart')
                spot.currentFoodItem.off('drag')
                foodItems.push(spot.currentFoodItem)
            }
        }

        // transfer vegetables
        let markers = [
            { name: 'c', start: 0.1, duration: 1.0, config: {} },
            { name: 'c', start: 1.315, duration: 0.808, config: {} },
            { name: 'c', start: 2.452, duration: 0.950, config: {} },
            { name: 'c', start: 3.497, duration: 0.927, config: {} },
            { name: 'c', start: 4.542, duration: 0.717, config: {} },
        ]
        this.scene.sound.play("transfer_vege", Phaser.Math.RND.pick(markers))

        for (let i = 0; i < foodItems.length; i++) {
            let item = foodItems[i]

            this.scene.tweens.add({
                targets: item,
                x: this.getLeftCenter().x - 5,
                y: this.getLeftCenter().y + 1,
                rotation: 0,
                ease: 'Power2',
                duration: 1000 + i * 400,
                onComplete: () => {
                    item.setTexture('ingredient_split', Utils.ingredientNum(item.ingredient))
                    this.scene.tweens.add({
                        targets: item,
                        x: this.getRightCenter().x - 100 - 60 * i,
                        ease: 'Power2',
                        duration: 800,
                        onStart: () => {
                            let markers = [
                                { name: 'c', start: 0.0, duration: 1.119, config: {} },
                                { name: 'c', start: 1.119, duration: 1.297, config: {} },
                                { name: 'c', start: 2.416, duration: 0.917, config: {} },
                                { name: 'c', start: 3.330, duration: 1.018, config: {} },
                                { name: 'c', start: 4.347, duration: 0.908, config: {} },
                            ]
                            // this.scene.sound.play("squishing", markers[0])
                            this.scene.sound.play("squishing", Phaser.Math.RND.pick(markers))
                        },
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: item,
                                alpha: 0,
                                ease: 'Power2',
                                delay: 900 + (foodItems.length - i) * 400,
                                duration: 500,
                                onComplete: () => {
                                    item.destroy(true)
                                }
                            })
                        }
                    })
                }
            })
        }

        let tween = this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: 'Power2',
            delay: Math.max(1000 + 400 * foodItems.length + 800 + 900, 4000),
            duration: 500,
            onStart: () => {
                this.scene.sound.play("eating", { name: 'c', start: 0.0, duration: 0.5, config: {} })
            },
            onComplete: () => {
                this.destroy(true)
                onComplete()
            }
        })
        return tween
    }
}