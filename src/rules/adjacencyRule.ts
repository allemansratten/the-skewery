import { Rule } from './rule'
import { Ingredient } from '../ingredient'

export class AdjacencyRule implements Rule {

  constructor(private left : Ingredient, private right : Ingredient) {
  }

  acceptable(arrangement : Ingredient[]) : boolean {
    for (let i = 0; i < arrangement.length - 1; i++) {
      if (arrangement[i] == this.left && arrangement[i + 1] == this.right) {
        return false
      }
    }

    return true
  }
}