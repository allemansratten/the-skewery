import 'phaser'

import { MainScene } from '../scenes/main'
import { FoodSpot } from './foodSpot';
import { FoodManager } from './foodManager';
import { FoodItem } from './foodItem';
import { Utils } from '../misc/utils';

export class Skewer extends Phaser.GameObjects.Image {
    localArrangement: Array<FoodSpot>

    constructor(public scene: MainScene, public manager: FoodManager, x: number, y: number) {
        super(scene, x, y, 'skewer')
        this.setOrigin(0, 0)
        scene.add.existing(this)
        this.setAlpha(0)
        scene.add.tween({
            targets: this,
            alpha: { from: 0, to: 1},
            duration: 700,
        })

        // Instantiate food spots
        this.localArrangement = new Array<FoodSpot>()
        for (let i = 0; i < 9; i++) {
            this.localArrangement.push(new FoodSpot(scene, 50 + x + i * 55, y + 90))
        }
        manager.arrangement.push(this.localArrangement)
    }

    public die(onComplete: () => void): Phaser.Tweens.Tween {
        let foodItems: Array<FoodItem> = new Array<FoodItem>()
        for (let spot of this.localArrangement) {
            this.scene.tweens.add({
                targets: spot,
                alpha: { from: 1, to : 0 },
                duration: 500,
                onComplete: () => { 
                    spot.destroy(true)
                }
            })
            if(!spot.isFree()) {
                foodItems.push(spot.currentFoodItem)
            }
        }

        for(let i = 0; i < foodItems.length; i++) {
            let item = foodItems[i]
            this.scene.tweens.add({
                targets: item,
                x: this.getLeftCenter().x-5,
                y: this.getLeftCenter().y+1,
                rotation: 0,
                ease: 'Power2',
                duration: 1000+i*400,
                onComplete: () => { 
                    item.setTexture('ingredient_split', Utils.ingredientNum(item.ingredient))
                    this.scene.tweens.add({
                        targets: item,
                        x: this.getRightCenter().x-100-60*i,
                        ease: 'Power2',
                        duration: 800,
                        onComplete: () => { 
                            this.scene.tweens.add({
                                targets: item,
                                alpha: 0,
                                ease: 'Power2',
                                delay: 900+(foodItems.length-i)*400,
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
            delay: Math.max(1000+400*foodItems.length+800+900, 4000),
            duration: 500,
            onComplete: () => { 
                this.destroy(true)
                onComplete()
            }
        })
        return tween
    }
}