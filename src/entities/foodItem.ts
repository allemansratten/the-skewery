import 'phaser'

import { FoodBase } from './foodBase'
import { Ingredient } from '../misc/ingredient'
import { Utils } from '../misc/utils'
import { FoodSpot } from './foodSpot'

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

    constructor(scene: Phaser.Scene, x: number, y: number, ingredient: Ingredient, base: FoodBase) {
        super(scene, x, y, "ingredient");

        this.setFrame(Utils.ingredientNum(ingredient))
        this.setDisplaySize(58, 58)
        this.ingredient = ingredient

        // Random rotation (Bětka to tak chtěla)
        this.setRotation(Math.random() * Math.PI * 2)

        this.setInteractive({
            draggable: true
        })

        this.on('dragstart', (pointer: Phaser.Input.Pointer) => {
            this.setTint(0xAAAAAA);
            this.x = pointer.position.x
            this.y = pointer.position.y
            
            base.instantiateNew()
            this.state = FoodItemState.DRAG
            this.setAlpha(1)
        });

        this.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.x = pointer.position.x
            this.y = pointer.position.y
            
            this.removeFoodSpot()
        });

        this.on('dragend', (pointer: Phaser.Input.Pointer) => {
            this.state = FoodItemState.PLACED
            this.clearTint();
        });

        this.on("drop", (pointer: Phaser.Input.Pointer, dropZone: FoodSpot) => {
            this.dropToFoodSpot(dropZone)
        })
        this.setAlpha(0.1)

        scene.add.existing(this)
    }

    public dropToFoodSpot (foodSpot: FoodSpot) {
        this.x = foodSpot.x
        this.y = foodSpot.y

        this.currentFoodSpot = foodSpot
        foodSpot.currentFoodItem = this
    }

    public removeFoodSpot () {
        if (this.currentFoodSpot !== undefined) {
            this.currentFoodSpot.currentFoodItem = undefined
            this.currentFoodSpot = undefined
        }
    }
}