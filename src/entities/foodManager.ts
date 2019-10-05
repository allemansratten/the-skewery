import 'phaser'
import { FoodItem } from './foodItem'
import { FoodSpot } from './foodSpot'
import { FoodBase } from './foodBase'
import { FoodBin } from './foodBin'
import { Ingredient, IngredientArray } from '../misc/ingredient'

export class FoodManager {

    scene: Phaser.Scene
    arrangement: FoodSpot[] = new Array<FoodSpot>()


    constructor(scene: Phaser.Scene) {
        this.scene = scene
        let backgroundBoard = scene.add.image(0, 0, 'background_board')
        backgroundBoard.setOrigin(0, 0)
        backgroundBoard.setAlpha(0.3)
        scene.add.image(575, 100, 'skewer')

        // new FoodBin(scene, 840, 350)

        // Instantiate food spots
        for (let i = 0; i < 10; i++) {
            this.arrangement.push(new FoodSpot(scene, 295 + i * 55, 170))
        }

        // Instantiate food bases
        let i = 0
        for(let ingredient of IngredientArray) {
            new FoodBase(scene, 400+i, 350, ingredient, this)
            i += 64
        }

        let checkArrangementButton = scene.add.image(250, 50, 'eye').setInteractive();
        checkArrangementButton.on('pointerup', (pointer) => {
            this.rearrange()
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

    rearrange() {
        let foodItems = new Array<FoodItem>()
        // get all items
        for (let spot of this.arrangement) {
            if (spot.currentFoodItem !== undefined) {
                foodItems.push(spot.currentFoodItem)
            }
        }

        console.log(foodItems.length)
        if (foodItems.length !== this.arrangement.length) {
            // reset all spots
            for (let spot of this.arrangement) {
                if (spot.currentFoodItem !== undefined) {
                    spot.currentFoodItem.currentFoodSpot = undefined
                }
                spot.currentFoodItem = undefined
            }

            // find new spots
            let filteredArrangement = this.arrangement.filter((foodSpot) => !foodSpot.hover)
            let startIndex: number = (filteredArrangement.length - foodItems.length)/2
            startIndex = Math.floor(startIndex)
            for (let i = 0; i < foodItems.length; i++){
                let foodItem = foodItems[i]
                let foodSpot = filteredArrangement[startIndex+i]
                foodItem.dropToFoodSpot(foodSpot)
            }
        }
    }
}