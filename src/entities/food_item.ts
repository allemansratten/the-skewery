import 'phaser'

import { FoodBase } from './food_base'
import { Ingredient } from '../misc/ingredient'
import { Utils } from '../misc/utils'
import { FoodSpot } from './food_spot'

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
        this.ingredient = ingredient

        this.setInteractive({
            draggable: true
        })

        this.on('dragstart', (pointer: Phaser.Input.Pointer) => {
            this.setTint(0xff0000);
            this.x = pointer.position.x
            this.y = pointer.position.y
        });

        this.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.state = FoodItemState.DRAG
            this.setAlpha(1)
            this.x = pointer.position.x
            this.y = pointer.position.y

            // TODO: tady je leak, protože se tvoří spousta nových objektů při pohybu objektu
            base.instantiateNew()
            
            if (this.currentFoodSpot !== undefined) {
                this.currentFoodSpot.currentFoodItem = undefined
                this.currentFoodSpot = undefined
            }
        });

        this.on('dragend', (pointer: Phaser.Input.Pointer) => {
            this.state = FoodItemState.PLACED
            this.clearTint();
        });

        this.on("drop", (pointer: Phaser.Input.Pointer, dropZone: FoodSpot) => {
            this.x = dropZone.x
            this.y = dropZone.y

            this.currentFoodSpot = dropZone

            dropZone.currentFoodItem = this
        })
        this.setAlpha(0.1)

        scene.add.existing(this)
    }
}