import { Rule } from "./rule"
import { Ingredient } from "../misc/ingredient"

export class CompositeRule implements Rule {
    description : string

    constructor(private rules : Rule[], description? : string) {
        this.description = description
    }

    acceptable(arrangement : Ingredient[]) : boolean {
        for (const rule of this.rules) {
            if (!rule.acceptable(arrangement)) {
                return false
            }
        }
        return true
    }
}