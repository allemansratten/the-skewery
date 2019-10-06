import { OccurrenceRule } from "../rules/occurrenceRule"
import { RegExpEvent } from "../rules/regExpEvent"
import { PalindromeEvent } from "../rules/palindromeEvent"
import { Rule } from "../rules/rule"
import { Ingredient, IngredientArray } from "./ingredient"
import { CompositeRule } from "../rules/compositeRule"
import { Utils } from "./utils"


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
    new OccurrenceRule(new RegExpEvent('(^|[^o])t($|[^o])'),
        undefined, 0, "t must be adjacent to o"),
    new OccurrenceRule(new RegExpEvent('o'), undefined, 2),
    new OccurrenceRule(new RegExpEvent('o'), 2, undefined),
    new OccurrenceRule(new PalindromeEvent(), 1, 1),
    new OccurrenceRule(new PalindromeEvent(), 0, 0),
    new OccurrenceRule(new RegExpEvent('e'), undefined, 0),
    new OccurrenceRule(new RegExpEvent('t'), undefined, 0),
    new OccurrenceRule(new RegExpEvent('....'), undefined, 0),
    new OccurrenceRule(new RegExpEvent('....'), 1, 1),
    // Rules from an example level
    new CompositeRule([
        new OccurrenceRule(new RegExpEvent('....'), undefined, 0),
        new OccurrenceRule(new RegExpEvent('p'), 1, 1),
    ]),
    new OccurrenceRule(new RegExpEvent('e'), 0, 1),
    new CompositeRule([
        new OccurrenceRule(new RegExpEvent('p'), 2, undefined),
        new OccurrenceRule(
            new RegExpEvent('.p.'), 1, undefined,
            "at least one pepper not at the edge"
        ),
    ]),
    new CompositeRule([
        new OccurrenceRule(new RegExpEvent('(^|[^e])p($|[^e])'),
            undefined, 0, "p must be adjacent to >= 1 e"),
        new OccurrenceRule(new RegExpEvent('epe'), undefined, 0),
    ]),
    new CompositeRule([
        new OccurrenceRule(new PalindromeEvent(), 1, undefined),
        new OccurrenceRule(new RegExpEvent('^.$|^...$'), 1, undefined),
    ]),
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

function search() {
    shuffle(rulesToTry)
    let indices : number[] = []
    const nBest = 10
    const maxNRules = 6
    let bestRulesets = []
    let iterations = 0

    while (true) {
        iterations++
        if (iterations % 1000 === 0) {
            console.log(iterations, "iterations")
            console.log(bestRulesets.slice(0, 5))
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
                examples: examples.map(ex => ex.map(sk => sk.map(
                    x => Utils.ingredientString(Utils.ingredientNum(x)))))
            })
            bestRulesets.sort((a, b) => {
                return a.nSolutions - b.nSolutions
            })
            bestRulesets = bestRulesets.slice(0, nBest)
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
    // console.log(JSON.stringify(bestRulesets.slice(0, 2), null, 2))
    console.log(bestRulesets)
}

search()
