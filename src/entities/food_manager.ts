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

        let addFoodSpot = (x: number, y: number): FoodSpot => {
            return new FoodSpot(scene, x, y)
        }

        for (let i = 0; i < 10; i++) {
            let foodSpot = addFoodSpot(270 + i * 58, 170)
            this.arrangement.push(foodSpot)
        }

        let addFoodBase = (x: number, y: number, ingredient: Ingredient): Phaser.GameObjects.Image => {
            let foodBase = new FoodBase(scene, x, y, ingredient)
            return foodBase
        }
        
        let i = 0
        for(let ingredient of IngredientArray) {
            addFoodBase(400+i, 400, ingredient)
            i += 64
        }


        let checkArrangementButton = scene.add.image(50, 50, 'eye').setInteractive();
        checkArrangementButton.on('pointerup', (pointer) => {
            console.log(this.getArrangement())
        })

    }

    update(time: number, delta: number) {

    }

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