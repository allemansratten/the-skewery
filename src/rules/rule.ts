import { Ingredient } from '../ingredient'

export interface Rule {
  acceptable(arrangement : Ingredient[]) : boolean;
}