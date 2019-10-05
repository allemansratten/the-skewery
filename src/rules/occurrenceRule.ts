import { Ingredient } from '../misc/ingredient'
import { RuleEvent } from "./ruleEvent"
import { Rule } from "./rule"

export class OccurrenceRule implements Rule {

    description : string

    // `event` must occur between `min` and `max` times (either may be undefined)
    constructor(private event : RuleEvent,
                private min : number,
                private max : number,
                description? : string) {
        if (min === undefined && max === undefined) {
            throw "Trivial OccurrenceRule; both min and max are set to undefined"
        }
        if (min !== undefined && max !== undefined && min > max) {
            throw "min>max in OccurrenceRule"
        }
        this.description = description
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
}