import 'phaser'

import { Ingredient } from '../misc/ingredient'
import { Utils } from '../misc/utils'

export class FoodItem extends Phaser.GameObjects.Image {

    ingredient: Ingredient

    constructor(scene: Phaser.Scene, x: number, y: number, ingredient: Ingredient) {
        super(scene, x, y, "ingredient");

        this.setFrame(Utils.ingredientNum(ingredient))
        this.ingredient = ingredient

        this.setInteractive()
        scene.input.setDraggable(this);

        this.on('dragstart', (pointer: Phaser.Input.Pointer) => {
            this.setTint(0xff0000);
        });

        this.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.x = dragX;
            this.y = dragY;
        });

        this.on('dragend', (pointer: Phaser.Input.Pointer) => {
            this.clearTint();
        });

        scene.add.existing(this)
    }
    
}