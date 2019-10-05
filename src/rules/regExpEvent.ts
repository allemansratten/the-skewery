import { RuleEvent } from "./ruleEvent"
import { arrangementToString, Ingredient, ingredientCharMapping } from "../misc/ingredient"

export class RegExpEvent implements RuleEvent {

    constructor(private regExp : string) {
    }

    count(arr : Ingredient[]) : number {
        let str = arrangementToString(arr)
        let matches = str.match(new RegExp(this.regExp, 'g'))
        if (matches === null) {
            matches = []
        }
        return matches.length
    }
}
