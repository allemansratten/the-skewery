import { Ingredient } from './ingredient'

export class Utils {
    // @deprecated
    public static ingredient2num(ingredient: string): number {
        return Ingredient[ingredient]
    }

    // @deprecated
    public static num2ingredient(ingredient: number): Ingredient {
        return Ingredient[Ingredient[ingredient]]
    }
}