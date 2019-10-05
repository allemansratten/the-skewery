import 'phaser'

import { FoodBase } from './food_base'
import { Ingredient } from '../misc/ingredient'
import { Utils } from '../misc/utils'

enum FoodItemState {
    INVISIBLE,
    DRAG,
    PLACED,
    THROWN_AWAY,
}

export class FoodItem extends Phaser.GameObjects.Image {

    ingredient: Ingredient
    state: FoodItemState = FoodItemState.INVISIBLE

    constructor(scene: Phaser.Scene, x: number, y: number, ingredient: Ingredient, base: FoodBase) {
        super(scene, x, y, "ingredient");

        this.setFrame(Utils.ingredientNum(ingredient))
        this.ingredient = ingredient

        this.setInteractive({
            draggable: true
        })

        this.on('dragstart', (pointer: Phaser.Input.Pointer) => {
            this.setTint(0xff0000);
        });

        this.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.state = FoodItemState.DRAG
            this.setAlpha(1)
            this.x = dragX
            this.y = dragY
            base.instantiateNew()
        });

        this.on('dragend', (pointer: Phaser.Input.Pointer) => {
            this.state = FoodItemState.PLACED
            this.clearTint();
        });

        this.on("drop", (pointer: Phaser.Input.Pointer, dropZone: Phaser.GameObjects.Zone) => {
            this.x = dropZone.x
            this.y = dropZone.y
        })
        this.setAlpha(0.1)

        scene.add.existing(this)
    }
}