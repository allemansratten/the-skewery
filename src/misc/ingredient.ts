import { Utils } from './utils'

export enum Ingredient {
    Eggplant,
    Tomato,
    Pepper,
    Onion,
}

export let IngredientArray : Ingredient[] = new Array<Ingredient>()

for (let item in Ingredient) {
    if (isNaN(Number(item))) {
        IngredientArray.push((<any>Ingredient)[item])
    }
}