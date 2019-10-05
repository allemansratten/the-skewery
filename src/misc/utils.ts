import { Ingredient } from './ingredient'

export class Utils {
    public static ingredient2num(ingredient: string): number {
        return Ingredient[ingredient]
    }

    public static num2ingredient(ingredient: number): Ingredient {
        return Ingredient[Ingredient[ingredient]]
    }
}