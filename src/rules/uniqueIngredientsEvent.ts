import { RuleEvent } from "./ruleEvent"
import { arrangementToString, Ingredient } from "../misc/ingredient"

export class PalindromeEvent implements RuleEvent {

    constructor() {
    }

    // Returns 1 for palindromes, 0 for non-palindromes
    count(arr : Ingredient[]) : number {
        let str = arrangementToString(arr)
        for(let i = 0; i < str.length; i++) {
            if (str[i] !== str[str.length - 1 - i]) {
                return 0
            }
        }
        return 1
    }
}
