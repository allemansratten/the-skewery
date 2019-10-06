import { RuleEvent } from "./ruleEvent"
import { arrangementToString, Ingredient } from "../misc/ingredient"

export class UniqueIngredientsEvent implements RuleEvent {

    constructor() {
    }

    // Returns the number of unique ingredients
    count(arr : Ingredient[]) : number {
        let s : Set<Ingredient> = new Set()
        for (const ing of arr) {
            s.add(ing)
        }
        return s.size
    }
}
