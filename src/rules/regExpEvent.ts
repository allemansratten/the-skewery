import { RuleEvent } from "./ruleEvent"
import { Ingredient } from "../misc/ingredient"

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

export class RegExpEvent implements RuleEvent {

  private regexp : RegExp

  constructor(regexp : string) {
    this.regexp = new RegExp(regexp,'g')
  }

  count(arr : Ingredient[]) : number {
    let str = arrangementToString(arr)
    let matches = str.match(this.regexp)
    if (matches === null) {
      matches = []
    }
    return matches.length
  }
}