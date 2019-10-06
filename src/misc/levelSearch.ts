import { OccurrenceRule } from "../rules/occurrenceRule"
import { RegExpEvent } from "../rules/regExpEvent"
import { PalindromeEvent } from "../rules/palindromeEvent"
import { Rule } from "../rules/rule"
import { Ingredient, IngredientArray } from "./ingredient"
import { CompositeRule } from "../rules/compositeRule"
import { Utils } from "./utils"
import { UniqueIngredientsEvent } from "../rules/uniqueIngredientsEvent"
import { CompareOccurencesRule } from "../rules/compareOccurencesRule"

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

const _MIN_SIZE = {"vasek": 1, "jirka": 3}
const _MAX_SIZE = {"vasek": 4, "jirka": 7}
const MAX_N_RULES = 4

let _rulesToTry = {
    "vasek": [
        new OccurrenceRule(new RegExpEvent('(^|[^o])t($|[^o])'), undefined, 0,
            "each tomato must be adjacent to an onion"),
        new OccurrenceRule(new RegExpEvent('o'), undefined, 2,
            "must have at most two onions"),
        new OccurrenceRule(new PalindromeEvent(), 1, 1,
            "must be a palindrome (stays the same when reversed)"),
        new OccurrenceRule(new PalindromeEvent(), 0, 0,
            "must not be a palindrome (palindrome = stays the same when reversed)"),
        // new OccurrenceRule(new RegExpEvent('e'), undefined, 0,
        //     "must not contain eggplant"),
        // new OccurrenceRule(new RegExpEvent('t'), undefined, 0,
        //     "must not contain tomatoes"),
        // new OccurrenceRule(new RegExpEvent('.'), 0, 2,
        //     "must be at most two items"),
        new OccurrenceRule(new RegExpEvent('.'), 0, 3,
            "must be at most three items"),
        new OccurrenceRule(new RegExpEvent('.'), 4, undefined,
            "must be at least four items"),
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
        // new CompositeRule([
        //     new OccurrenceRule(new RegExpEvent('e'), 1, undefined),
        //     new OccurrenceRule(new RegExpEvent('p'), 1, undefined),
        //     new OccurrenceRule(new RegExpEvent('p.*e'), undefined, 0)
        // ], "must contain an eggplant and a pepper, and each eggplant must be to the left of all peppers"),
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
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('p'), 2, undefined),
            new OccurrenceRule(new RegExpEvent('pp'), 0, 0),
        ], "must have at least two peppers, but they must not be adjacent"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('e'), 2, 2),
            new OccurrenceRule(new RegExpEvent('.'), 4, 4),
        ], "must have exactly four items, exactly two of which must be eggplants"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('e'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('o'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('p'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('t'), undefined, 0),
        ], "must have every ingredient except for tomatoes (and no tomatoes)"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('ot|to'), 0, 0),
            new OccurrenceRule(new RegExpEvent('o'), 1, undefined),
        ], "must contain an onion, but onions and tomatoes must not be adjacent"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('e.e'), 1, 1),
            new OccurrenceRule(new RegExpEvent('e'), 2, 2),
        ], "must contain exactly two eggplants, and there must be exactly one item between them"),
    ],
    "jirka": []
}

for (let veg of ["o", "t", "e", "p"]) {
    // for (let num = 1; num < MAX_SIZE-2; num++){
    //     _rulesToTry["jirka"].push(
    //         new OccurrenceRule(new RegExpEvent(veg), undefined, num, "at most "+num+" "+veg),
    //         new OccurrenceRule(new RegExpEvent(veg), num, undefined, "at least "+num+" "+veg),
    //         new OccurrenceRule(new RegExpEvent(veg + '{' + num + '}'), undefined, 1, "at most " + num + " consecutive " + veg),
    //     )
    // }
    // for (let num = 2; num < MAX_SIZE - 2; num++) {
    //     _rulesToTry["jirka"].push(
    //         new OccurrenceRule(new RegExpEvent(veg + '{' + num + '}'), 1, undefined, "at least " + num + " consecutive " + veg),
    //     )
    // }

    _rulesToTry["jirka"].push(
        new OccurrenceRule(new RegExpEvent('^' + veg + '|' + veg + '$'), undefined, 0, veg + " not at the edge"),
        new OccurrenceRule(new RegExpEvent('^' + veg + '|' + veg + '$'), 1, 2, "at least one " + veg + " at the edge")
    )
    for (let veg2 of ["o", "t", "e", "p"]) {
        if (veg == veg2) {
            continue
        }
        _rulesToTry["jirka"].push(
            new OccurrenceRule(new RegExpEvent('(^|[^' + veg + '])' + veg2 + '($|[^' + veg + '])'), undefined, 0, "each " + veg2 + " must be adjacent to " + veg),
            new OccurrenceRule(new RegExpEvent(veg + veg2 + '|' + veg2 + veg), undefined, 0, "each " + veg2 + " must not be adjacent to " + veg),
            new OccurrenceRule(new RegExpEvent(veg2 + '($|[^' + veg + '])'), undefined, 0, "each " + veg2 + " must be left of " + veg),
            new OccurrenceRule(new RegExpEvent('(^|[^' + veg + '])' + veg2), undefined, 0, "each " + veg2 + " must be right of " + veg),
        )
        _rulesToTry["jirka"].push(
            new CompareOccurencesRule(new RegExpEvent(veg), new RegExpEvent(veg2), (x, y) => {
                return x == y
            }, "the number of " + veg2 + " and " + veg + " is equal"),
            new CompareOccurencesRule(new RegExpEvent(veg), new RegExpEvent(veg2), (x, y) => {
                return x > y
            }, "the number of " + veg + " is greater than the number of " + veg2 + " "),
            new CompareOccurencesRule(new RegExpEvent(veg), new RegExpEvent(veg2), (x, y) => {
                return x >= y
            }, "the number of " + veg + " is greater or equal to the number of " + veg2 + " "),
            new CompareOccurencesRule(new RegExpEvent(veg), new RegExpEvent(veg2), (x, y) => {
                return x == 2 * y
            }, "the number of " + veg + " is two times the number of " + veg2 + " "),
            // new CompareOccurencesRule(new RegExpEvent(veg), new RegExpEvent(veg2), (x, y) => { return x == 3*y }, "the number of "+veg+" is three times the number of "+veg2+" "),
        )
        for (let veg3 of ["o", "t", "e", "p"]) {
            if (veg == veg3 || veg2 == veg3) {
                continue
            }
            _rulesToTry["jirka"].push(
                new OccurrenceRule(new RegExpEvent('(^|[^' + veg + veg3 + '])' + veg2 + '($|[^' + veg + veg3 + '])'), undefined, 0, "each " + veg2 + " must be adjacent to " + veg + " or " + veg3),
                new OccurrenceRule(new RegExpEvent(veg + veg2 + '|' + veg2 + veg + '|' + veg3 + veg2 + '|' + veg2 + veg3), undefined, 0, "each " + veg2 + " must not be adjacent to " + veg + " or " + veg3),
                new OccurrenceRule(new RegExpEvent(veg2 + '($|[^' + veg + veg3 + '])'), undefined, 0, "each " + veg2 + " must be left of " + veg + " or " + veg3),
                new OccurrenceRule(new RegExpEvent('(^|[^' + veg + veg3 + '])' + veg2), undefined, 0, "each " + veg2 + " must be right of " + veg + " or " + veg3),
            )


        }
    }

    _rulesToTry["jirka"].push(
        new OccurrenceRule(new PalindromeEvent(), 1, 1, "must be a palindrome (stays the same when reversed)"),
        // new OccurrenceRule(new UniqueIngredientsEvent(), 4, 4, "must contain exactly four kinds of ingredients"),
        new OccurrenceRule(new UniqueIngredientsEvent(), 3, 3, "must contain exactly three kinds of ingredients"),
        new OccurrenceRule(new UniqueIngredientsEvent(), 3, 4, "must contain at least three kinds of ingredients"),
    )
}

// for (let num = 1; num < MAX_SIZE; num++) {
//     _rulesToTry["jirka"].push(
//         new OccurrenceRule(new RegExpEvent(veg), undefined, num, "at most " + num + " " + veg),
//         new OccurrenceRule(new RegExpEvent(veg), num, undefined, "at least " + num + " " + veg),
//     )
// }

const rulesToTry = _rulesToTry[process.argv[2]]

const nSkewers : number = parseInt(process.argv[3])
const MIN_SIZE = _MIN_SIZE[process.argv[2]]
const MAX_SIZE = _MAX_SIZE[process.argv[2]]

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

        if (nSkewers == 1) {
            let passEvery = rules.every(rule => rule.acceptable(sk1))
            if (passEvery) {
                if (sk1.length < MIN_SIZE) {
                    // Solvable with a short skewer
                    return [10000, []]
                }
                solCount++

                if (examples.length < 10) {
                    examples.push([sk1])
                }
            }
        } else if (nSkewers == 2) {
            for (let i2 = i1; i2 < skewers.length; i2++) {
                let sk2 = skewers[i2]
                let passEvery = rules.every(rule => rule.acceptable(sk1) || rule.acceptable(sk2))
                if (passEvery) {
                    if (sk1.length < MIN_SIZE || sk2.length < MIN_SIZE) {
                        // Solvable with a short skewer
                        return [10000, []]
                    }
                    solCount++
                    if (examples.length < 10) {
                        examples.push([sk1, sk2])
                    }
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
        console.log("    ", sol.join(" | "))
    }
    console.log()
}

function search() {
    shuffle(rulesToTry)
    let indices : number[] = []
    const nBest = 10
    let bestRulesets : Ruleset[] = []
    let iterations = 0

    while (true) {
        iterations++
        if (iterations % 5000 === 0) {
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
        if (curRules.length <= MAX_N_RULES) {
            [nSolutions, examples] = solutionCount(
                curRules,
                bestRulesets.length > 0 ? bestRulesets[0].nSolutions : 1000
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
