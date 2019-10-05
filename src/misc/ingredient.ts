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

export let ingredientCharMapping : [Ingredient, string][] = [
    [Ingredient.Pepper, 'p'],
    [Ingredient.Tomato, 't'],
    [Ingredient.Eggplant, 'e'],
    [Ingredient.Onion, 'o'],
]

if (ingredientCharMapping.length !== Object.keys(Ingredient).length / 2) {
    throw "in regexEvent, ingredientCharMapping does not list the right number of ingredients"
}

export function arrangementToString(arr : Ingredient[]) : string {
    let res = ""
    for (let x of arr) {
        for (let [ing, c] of ingredientCharMapping) {
            if (ing === x) {
                res += c
            }
        }
    }
    return res
}