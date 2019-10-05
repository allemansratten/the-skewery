import 'phaser'
import { FoodItem } from './foodItem'
import { FoodSpot } from './foodSpot'
import { FoodBase } from './foodBase'
import { Skewer } from './skewer'
import { MainScene } from '../scenes/main'
import { Ingredient, IngredientArray } from '../misc/ingredient'
import { Utils } from '../misc/utils'
import { ingredientCharMapping } from '../rules/regExpEvent'

export class FoodManager {

    scene: MainScene
    arrangement: Array<Array<FoodSpot>> = new Array<Array<FoodSpot>>()
    skewers: Array<Skewer> = new Array<Skewer>()

    constructor(scene: MainScene) {
        this.scene = scene
        let backgroundBoard = scene.add.image(0, 0, 'background_board')
        backgroundBoard.setOrigin(0, 0)
        backgroundBoard.setAlpha(1)

        this.skewers.push(new Skewer(scene, this, 575, 80))
        this.skewers.push(new Skewer(scene, this, 575, 200))

        // Instantiate food bases
        let i = 0
        for(let ingredient of IngredientArray) {
            new FoodBase(scene, 400+i, 350, ingredient, this)
            i += 64
        }
    }

    update(time: number, delta: number) { }

    public getArrangement(): Array<Array<Ingredient>> {
        let ingredientArrangement = new Array<Array<Ingredient>>()

        for(let arrangement of this.arrangement) {
            let localArrangement = new Array<Ingredient>()
            for(let spot of arrangement) {
                if (spot.currentFoodItem !== undefined){
                    localArrangement.push(spot.currentFoodItem.ingredient)
                }
            }
            ingredientArrangement.push(localArrangement)
        }

        return ingredientArrangement
    }
    
    public rearrange() {
        // console.log("==============================")
        for(let i = 0; i < this.skewers.length; i++) {
            // console.log("skewer", i)
            this.rearrangeSkewer(i)
        }
    }

    public resetHover() {
        for (let arrangement of this.arrangement) {
            arrangement.forEach((foodSpot) => {foodSpot.hover = false})
        }
    }

    private rearrangeSkewer(skewerIndex: number) {
        let foodItems = new Array<FoodItem>()
        // get all items
        for (let spot of this.arrangement[skewerIndex]) {
            if (spot.currentFoodItem !== undefined) {
                foodItems.push(spot.currentFoodItem)
                // console.log(Utils.ingredientString(spot.currentFoodItem.ingredient), spot.hover)
            }
            else {
                // console.log("Empty", spot.hover)
            }
        }

        if (foodItems.length !== this.arrangement[skewerIndex].length) {
            // reset all spots
            for (let spot of this.arrangement[skewerIndex]) {
                if (spot.currentFoodItem !== undefined) {
                    spot.currentFoodItem.currentFoodSpot = undefined
                }
                spot.currentFoodItem = undefined
            }

            // find new spots
            let filteredArrangement = this.arrangement[skewerIndex].filter((foodSpot) => !foodSpot.hover)
            let startIndex: number = (filteredArrangement.length - foodItems.length)/2
            startIndex = Math.floor(startIndex)
            for (let i = 0; i < foodItems.length; i++){
                let foodItem = foodItems[i]
                let foodSpot = filteredArrangement[startIndex+i]
                foodItem.dropToFoodSpot(foodSpot)
            }
        }

        // console.log("AFTER REARRANGE")

        for (let spot of this.arrangement[skewerIndex]) {
            if (spot.currentFoodItem !== undefined) {
                // console.log(Utils.ingredientString(spot.currentFoodItem.ingredient), spot.hover)
            }
            else {
                // console.log("Empty", spot.hover)
            }
        }

        this.scene.ruleManager.updateProgress()
    }
}