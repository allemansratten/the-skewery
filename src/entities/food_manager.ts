import 'phaser'
import { FoodItem } from '../entities/food_item'
import { FoodSpot } from '../entities/food_spot'
import { FoodBase } from '../entities/food_base'
import { Ingredient, IngredientArray } from '../misc/ingredient'

export class FoodManager {

    scene: Phaser.Scene
    arrangement: FoodSpot[] = new Array<FoodSpot>()


    constructor(scene: Phaser.Scene) {
        this.scene = scene
        let backgroundBoard = scene.add.image(0, 0, 'background_board')
        backgroundBoard.setOrigin(0, 0)
        backgroundBoard.setAlpha(0.3)
        scene.add.image(565, 100, 'skewer')

        // Instantiate food spots
        for (let i = 0; i < 10; i++) {
            this.arrangement.push(new FoodSpot(scene, 295 + i * 55, 170))
        }

        // Instantiate food bases
        let i = 0
        for(let ingredient of IngredientArray) {
            new FoodBase(scene, 400+i, 350, ingredient)
            i += 64
        }

        let checkArrangementButton = scene.add.image(250, 50, 'eye').setInteractive();
        checkArrangementButton.on('pointerup', (pointer) => {
            console.log(this.getArrangement())
        })
    }

    update(time: number, delta: number) { }

    getArrangement() {
        let ingredientArrangement = new Array<Ingredient>()

        for(let spot of this.arrangement) {
            if (spot.currentFoodItem !== undefined){
                ingredientArrangement.push(spot.currentFoodItem.ingredient)
            }
        }

        return ingredientArrangement
    }
}