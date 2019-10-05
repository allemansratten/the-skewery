import { OccurrenceRule } from "../rules/occurrenceRule"
import { RegExpEvent } from "../rules/regExpEvent"
import { PalindromeEvent } from "../rules/palindromeEvent"
import { Rule } from "../rules/rule"


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

let maxSize = 4
let nSkewers = 2

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
]

function solutionCount(rules : Rule[]) : number {
    // TODO
    return 5 - rules.length
}

function search() {
    shuffle(rulesToTry)
    // TODO
}

search()