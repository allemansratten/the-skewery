import { RuleEvent } from "./ruleEvent"
import { arrangementToString, Ingredient, ingredientCharMapping } from "../misc/ingredient"

export class RegExpEvent implements RuleEvent {

    private regExp: RegExp

    constructor(private regExpString : string) {
        this.regExp = new RegExp(regExpString, 'g')
    }

    count(arr : Ingredient[]) : number {
        let str = arrangementToString(arr)
        let matches = str.match(this.regExp)
        if (matches === null) {
            matches = []
        }
        return matches.length
    }
}
