import { Ingredient } from './ingredient'

export class Utils {
    public static ingredientNum(ingredient: Ingredient): number {
        return ingredient
    }

    public static ingredientString(ingredient: number): string {
        return Ingredient[ingredient]
    }

    public static stringIngredient(ingredient: string): Ingredient {
        return (<any>Ingredient)[ingredient]
    }
}