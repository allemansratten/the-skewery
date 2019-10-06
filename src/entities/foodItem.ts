import 'phaser'

import { FoodManager } from './foodManager'
import { FoodBase } from './foodBase'
import { Ingredient } from '../misc/ingredient'
import { Utils } from '../misc/utils'
import { FoodSpot } from './foodSpot'
import { Scene } from 'phaser'

enum FoodItemState {
    INVISIBLE,
    DRAG,
    PLACED,
    THROWN_AWAY,
}

export class FoodItem extends Phaser.GameObjects.Image {

    ingredient: Ingredient
    state: FoodItemState = FoodItemState.INVISIBLE
    currentFoodSpot: FoodSpot
    scene: Scene

    constructor(scene: Phaser.Scene, x: number, y: number, ingredient: Ingredient, base: FoodBase, foodManager: FoodManager) {
        super(scene, x, y, "ingredient");

        this.scene = scene

        this.setFrame(Utils.ingredientNum(ingredient))
        this.setDisplaySize(58, 58)
        this.ingredient = ingredient
        this.setAlpha(0.1)
        scene.add.existing(this)
        this.setDepth(100)

        // Random rotation (Bětka to tak chtěla)
        this.setRotation(Math.random() * Math.PI * 2)

        this.setInteractive({
            draggable: true
        })

        this.on('dragstart', (pointer: Phaser.Input.Pointer) => {
            this.setTint(0xAAAAAA);
            this.x = pointer.position.x
            this.y = pointer.position.y

            if (this.state == FoodItemState.INVISIBLE) {
                // sound effect
                let markers = [
                    { name: 'c', start:25.255, duration: 1.466, config: {} },
                    { name: 'c', start:19.230, duration: 1.080, config: {} },
                    { name: 'c', start:14.786, duration: 1.061, config: {} },
                    { name: 'c', start:13.669, duration: 1.121, config: {} },
                    { name: 'c', start: 8.142, duration: 1.156, config: {} },
                    { name: 'c', start: 6.907, duration: 0.810, config: {} },
                    { name: 'c', start: 5.693, duration: 0.641, config: {} },
                    { name: 'c', start: 4.214, duration: 0.891, config: {} },
                    { name: 'c', start: 2.837, duration: 0.565, config: {} },
                    { name: 'c', start: 0.475, duration: 0.9, config: {} }
                ]
                scene.sound.play("cutting", Phaser.Math.RND.pick(markers))

                base.instantiateNew()
                this.state = FoodItemState.DRAG
                this.setAlpha(1)
            }

            if (this.currentFoodSpot !== undefined) {
                this.currentFoodSpot.hover = true;
            }

            this.removeFoodSpot()
            foodManager.rearrange()

        });

        this.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.x = pointer.position.x
            this.y = pointer.position.y
        });

        this.on('dragend', (pointer: Phaser.Input.Pointer) => {
            this.state = FoodItemState.PLACED

            if (this.currentFoodSpot === undefined) {
                this.remove()
            }
            else {
                this.clearTint();
            }
            // clear foodspot hover
            foodManager.resetHover()

        });

        this.on("drop", (pointer: Phaser.Input.Pointer, dropZone: Phaser.GameObjects.Image) => {
            if (dropZone instanceof FoodSpot) {
                this.dropToFoodSpot(dropZone)
                // clear foodspot hover
                foodManager.resetHover()
                foodManager.rearrange()

                // put down sound
                let markers = [
                    { name: 'c', start: 7.065, duration: 0.184, config: {} },
                    { name: 'c', start: 3.505, duration: 1.0, config: {} },
                    { name: 'c', start: 1.548, duration: 1.149, config: {} },
                    { name: 'c', start: 0.075, duration: 0.927, config: {} },
                ]
                this.scene.sound.play("put", Phaser.Math.RND.pick(markers))
            } else {
                this.remove()
            }

        })

        this.on("dragenter", (pointer: Phaser.Input.Pointer, dropZone: FoodSpot) => {
            dropZone.hover = true
            foodManager.rearrange()
        })
        this.on("dragleave", (pointer: Phaser.Input.Pointer, dropZone: FoodSpot) => {
            foodManager.resetHover()
            foodManager.rearrange()
        })

        this.setAlpha(0.1)

        scene.add.existing(this)
    }
    public dropToFoodSpot(foodSpot: FoodSpot) {
        if (foodSpot.isFree()) {
            // this.x = foodSpot.x
            // this.y = foodSpot.y

            this.scene.tweens.add({
                targets: this,
                x: foodSpot.x,
                y: foodSpot.y,
                duration: 200,
                ease: 'Power2'
            })

            this.currentFoodSpot = foodSpot
            foodSpot.currentFoodItem = this
        }
        else {
            // TODO remove the food item
            // Really? It seems to be working even without this -zouharvi
        }
    }

    public removeFoodSpot() {
        if (this.currentFoodSpot !== undefined) {
            this.currentFoodSpot.currentFoodItem = undefined
            this.currentFoodSpot = undefined
        }
    }

    public remove() {
        this.state = FoodItemState.THROWN_AWAY

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 200,
            ease: 'Power2'
        })

        // throw away sound
        let markers = [
            { name: 'c', start: 11.390, duration: 1.123, config: {} },
            { name: 'c', start: 9.865, duration: 0.827, config: {} },
            { name: 'c', start: 8.036, duration: 1.267, config: {} },
            { name: 'c', start: 6.777, duration: 0.820, config: {} },
            { name: 'c', start: 5.100, duration: 1.123, config: {} },
            { name: 'c', start: 3.392, duration: 0.888, config: {} },
            { name: 'c', start: 1.799, duration: 0.979, config: {} },
            { name: 'c', start: 0.258, duration: 1.009, config: {} },
        ]
        this.scene.sound.play("rustling", Phaser.Math.RND.pick(markers))
    }
}