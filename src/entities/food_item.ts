import 'phaser'

import { FoodBase } from './food_base'
import { FoodManager } from './food_manager'
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

    constructor(scene: Phaser.Scene, x: number, y: number, ingredient: Ingredient, base: FoodBase, foodManager: FoodManager) {
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

            if (this.currentFoodSpot !== undefined) {
                this.currentFoodSpot.hover = true;
            }
            this.removeFoodSpot()
            foodManager.rearrange()
        });

        this.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.state = FoodItemState.DRAG
            this.setAlpha(1)
            this.x = pointer.position.x
            this.y = pointer.position.y
        });

        this.on('dragend', (pointer: Phaser.Input.Pointer) => {
            this.state = FoodItemState.PLACED
            this.clearTint();

            // clear hover
            foodManager.arrangement.forEach((foodSpot) => {foodSpot.hover = false})
        });
        
        this.on("drop", (pointer: Phaser.Input.Pointer, dropZone: FoodSpot) => {
            this.dropToFoodSpot(dropZone)
            
            // clear hover
            foodManager.arrangement.forEach((foodSpot) => {foodSpot.hover = false})
            foodManager.rearrange()
        })

        this.on("dragenter", (pointer: Phaser.Input.Pointer, dropZone: FoodSpot) => {
            dropZone.hover = true
            
            foodManager.rearrange()
        })
        this.on("dragleave", (pointer: Phaser.Input.Pointer, dropZone: FoodSpot) => {
            dropZone.hover = false

            foodManager.rearrange()
        })

        this.setAlpha(0.1)

        scene.add.existing(this)
    }

    public dropToFoodSpot (foodSpot: FoodSpot) {
        if (foodSpot.isFree()){
            this.x = foodSpot.x
            this.y = foodSpot.y
    
            this.currentFoodSpot = foodSpot
            foodSpot.currentFoodItem = this
        }
        else {
            // TODO remove the food item
        }
    }

    public removeFoodSpot () {
        if (this.currentFoodSpot !== undefined) {
            this.currentFoodSpot.currentFoodItem = undefined
            this.currentFoodSpot = undefined
        }
    }
}