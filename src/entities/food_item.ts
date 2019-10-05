import 'phaser'

import { Ingredient, Ingredient2Frame } from '../misc/ingredient'

export class FoodItem extends Phaser.GameObjects.Image {

    ingredient: Ingredient

    constructor(scene: Phaser.Scene, x: number, y: number, ingredient: Ingredient) {
        super(scene, x, y, "ingredient");

        this.setFrame(Ingredient2Frame[ingredient])
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