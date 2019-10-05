import { Ingredient } from '../misc/ingredient'
import { RuleEvent } from "./ruleEvent"

export class Rule {

    private comment : string

    // `event` must occur between `min` and `max` times (either may be undefined)
    constructor(private event : RuleEvent, private min : number, private max : number) {
        if (min === undefined && max === undefined) {
            throw "Trivial OccurrenceRule; both min and max are set to undefined"
        }
        if (min !== undefined && max !== undefined && min > max) {
            throw "min>max in OccurrenceRule"
        }
    }

    acceptable(arrangement : Ingredient[]) : boolean {
        let occ = this.event.count(arrangement)
        if (this.min !== undefined && occ < this.min) {
            return false
        }
        if (this.max !== undefined && occ > this.max) {
            return false
        }
        return true
    }

    description() : string {
        return "TODO"
    }
}