import { Ingredient } from "../misc/ingredient";

export interface RuleEvent {
  count(arrangement : Ingredient[]) : number;
}