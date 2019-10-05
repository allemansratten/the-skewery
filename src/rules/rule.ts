import { Ingredient } from '../misc/ingredient'

export interface Rule {
  acceptable(arrangement : Ingredient[]) : boolean;
}