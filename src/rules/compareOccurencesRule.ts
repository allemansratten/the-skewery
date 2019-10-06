import { RuleEvent } from "./ruleEvent"
import { Rule } from "./rule"
import { arrangementToString, Ingredient } from "../misc/ingredient"

export class CompareOccurencesRule implements Rule {

    description: string

    constructor(
        private event1: RuleEvent,
        private event2: RuleEvent,
        private compare: (x: number, y: number) => boolean,
        description?: string
        ) {
        this.description = description
    }

    // Returns 1 for palindromes, 0 for non-palindromes
    acceptable(arrangement: Ingredient[]): boolean {
        let occ1 = this.event1.count(arrangement)
        let occ2 = this.event2.count(arrangement)

        return this.compare(occ1, occ2)
    }
}
