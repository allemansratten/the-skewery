import { OccurrenceRule } from "../rules/occurrenceRule"
import { RegExpEvent } from "../rules/regExpEvent"
import { PalindromeEvent } from "../rules/palindromeEvent"
import { Rule } from "../rules/rule"
import { Ingredient, IngredientArray } from "./ingredient"
import { CompositeRule } from "../rules/compositeRule"
import { Utils } from "./utils"
import { UniqueIngredientsEvent } from "../rules/uniqueIngredientsEvent"


// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array : any[]) {
    let currentIndex = array.length, temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}

const MAX_SIZE = 4

let rulesToTry = [
    new OccurrenceRule(new RegExpEvent('(^|[^o])t($|[^o])'), undefined, 0,
        "each tomato must be adjacent to an onion"),
    new OccurrenceRule(new RegExpEvent('o'), undefined, 2,
        "must have at most two onions"),
    new OccurrenceRule(new PalindromeEvent(), 1, 1,
        "must be a palindrome (stays the same when reversed)"),
    new OccurrenceRule(new PalindromeEvent(), 0, 0,
        "must not be a palindrome (palindrome = stays the same when reversed)"),
    new OccurrenceRule(new RegExpEvent('e'), undefined, 0,
        "must not contain eggplant"),
    new OccurrenceRule(new RegExpEvent('t'), undefined, 0,
        "must not contain tomatoes"),
    // new OccurrenceRule(new RegExpEvent('.'), 0, 2,
    //     "must be at most two items"),
    new OccurrenceRule(new RegExpEvent('.'), 0, 3,
        "must be at most three items"),
    new OccurrenceRule(new RegExpEvent('.'), 4, undefined,
        "must be at least four items"),
    // Rules from an example level

    // More rules
    new OccurrenceRule(new RegExpEvent('p|o'), undefined, 0,
        "must contain neither peppers nor onions"),
    new OccurrenceRule(new RegExpEvent('t|e'), undefined, 0,
        "must contain neither tomatoes nor eggplants"),
    new OccurrenceRule(new UniqueIngredientsEvent(), 3, 3,
        "must contain exactly three kinds of ingredients"),
    new OccurrenceRule(new UniqueIngredientsEvent(), 0, 2,
        "must contain at most two kinds of ingredients"),
    new OccurrenceRule(new UniqueIngredientsEvent(), 3, undefined,
        "must contain at least three kinds of ingredients"),
    // Composite/more complicated rules
    new CompositeRule([
        new OccurrenceRule(new PalindromeEvent(), 1, undefined),
        new OccurrenceRule(new RegExpEvent('^(..)*$'), 1, undefined),
    ], "must be a palindrome of an even length"),
    new CompositeRule([
        new OccurrenceRule(new RegExpEvent('e'), 1, undefined),
        new OccurrenceRule(new RegExpEvent('p'), 1, undefined),
        new OccurrenceRule(new RegExpEvent('p.*e'), undefined, 0)
    ], "must contain an eggplant and a pepper, and each eggplant must be to the left of all peppers"),
    new CompositeRule([
        new OccurrenceRule(new RegExpEvent('o'), 1, undefined),
        new OccurrenceRule(new RegExpEvent('t'), 1, undefined),
        new OccurrenceRule(new RegExpEvent('t.*o'), undefined, 0)
    ], "must contain an onion and a tomato, and each onion must be to the left of all tomatoes"),
    new OccurrenceRule(new RegExpEvent('oo'), 0, 0,
        "must not have two onions next to each other"),
    new OccurrenceRule(new RegExpEvent('tt'), 0, 0,
        "must not have two tomatoes next to each other"),
    new OccurrenceRule(new RegExpEvent('[^t]t|t[^t]|^t$'), 0, 0,
        "must not have two tomatoes next to each other"),
    new OccurrenceRule(new RegExpEvent('tt|ee|pp|oo'), 0, 0,
        "must not have two of the same ingredient next to each other"),
]

function solutionCount(rules : Rule[], cutoff : number) : [number, Ingredient[][][]] {

    let ingredients = IngredientArray
    let skewers = [[]]
    for (let l = 1; l <= MAX_SIZE; l++) {
        for (let mask = 0; mask < ingredients.length ** l; mask++) {
            let curMask = mask
            let cur = []
            for (let i = 0; i < l; i++) {
                cur.push(ingredients[curMask % ingredients.length])
                curMask = Math.floor(curMask / ingredients.length)
            }
            skewers.push(cur)
        }
    }

    let solCount = 0
    let examples = []
    for (let i1 = 0; i1 < skewers.length; i1++) {
        let sk1 = skewers[i1]
        for (let i2 = i1; i2 < skewers.length; i2++) {
            let sk2 = skewers[i2]
            let passEvery = rules.every(rule => rule.acceptable(sk1) || rule.acceptable(sk2))
            if (passEvery) {
                if (i1 === 0 || i2 === 0) {
                    // Solvable with an empty skewer
                    return [10000, []]
                }
                solCount++
                if (examples.length < 10) {
                    examples.push([sk1, sk2])
                }
            }
        }
        if (solCount > cutoff) {
            break
        }
    }

    return [solCount, examples]
}

interface Ruleset {
    nSolutions : number;
    indices : number[];
    solutions : Ingredient[][][];
    iteration : number;
}

function printRuleset(ruleset : Ruleset) {
    console.log(`number of solutions: ${ruleset.nSolutions}`)
    console.log("rules:")
    for (const i of ruleset.indices) {
        console.log(`    ${i} ${rulesToTry[i].description}`)
    }
    console.log("solution examples:")
    for (const sol of ruleset.solutions) {
        console.log(`    ${sol[0]} | ${sol[1]}`)
    }
    console.log()
}

function search() {
    shuffle(rulesToTry)
    let indices : number[] = []
    const nBest = 10
    const maxNRules = 5
    let bestRulesets : Ruleset[] = []
    let iterations = 0

    while (true) {
        iterations++
        if (iterations % 1000 === 0) {
            console.log(`${iterations} iterations: vvv`)
            for (const ruleset of bestRulesets.slice(0, 3)) {
                printRuleset(ruleset)
            }
            console.log(`${iterations} iterations: ^^^`)
        }

        // console.log(indices)
        let curRules = []
        for (const i of indices) {
            curRules.push(rulesToTry[i])
        }
        let nSolutions = 0
        let examples = []
        if (curRules.length <= maxNRules) {
            [nSolutions, examples] = solutionCount(
                curRules,
                bestRulesets.length > 0 ? bestRulesets[bestRulesets.length - 1].nSolutions : 1000
            )
        }
        if (nSolutions > 0) {
            bestRulesets.push({
                nSolutions: nSolutions,
                indices: [...indices],
                solutions: examples.map(ex => ex.map(sk => sk.map(
                    x => Utils.ingredientString(Utils.ingredientNum(x))))),
                iteration: iterations
            })
            bestRulesets.sort((a, b) => {
                if (a.nSolutions - b.nSolutions !== 0) {
                    return a.nSolutions - b.nSolutions
                } else {
                    return a.iteration - b.iteration
                }
            })
            bestRulesets = bestRulesets.slice(0, nBest)
            bestRulesets = bestRulesets.reverse()
            if (indices.length === 0) {
                indices.push(-1)
            } else {
                indices.push(indices[indices.length - 1])
            }
        }

        while (indices.length > 0) {
            let last = indices.pop()
            last++
            if (last !== rulesToTry.length) {
                indices.push(last)
                break
            }
        }
        if (indices.length === 0) {
            break
        }
    }

    for (const ruleset of bestRulesets) {
        printRuleset(ruleset)
    }
}

search()
