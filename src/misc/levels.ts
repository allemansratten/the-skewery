import { Level } from "../rules/level"
import { RegExpEvent } from "../rules/regExpEvent"
import { OccurrenceRule } from "../rules/occurrenceRule"
import { CompositeRule } from "../rules/compositeRule"
import { PalindromeEvent } from "../rules/palindromeEvent"
import { UniqueIngredientsEvent } from "../rules/uniqueIngredientsEvent"
import { CompareOccurencesRule } from "../rules/compareOccurencesRule"

export let levels: Level[] = [
    // Uvodni, seznami hrace s prvky na obrazovce
    new Level([
        new OccurrenceRule(new RegExpEvent("t"), 1, undefined,
            "must have at least one tomato"),
        new OccurrenceRule(new RegExpEvent("o"), 1, undefined,
            "must have at least one onion"),
    ], 1, 5),
    // Uvodni, rekne hracovi, ze toto bude puzzle hra o špízu
    new Level([
        new OccurrenceRule(new RegExpEvent("t"), 2, undefined,
            "must have at least two tomatoes"),
        new OccurrenceRule(new RegExpEvent("tt"), undefined, 0,
            "must not have two consecutive tomatoes"),
    ], 1),
    // Zbytecne dlouha formulace, ale lehka uloha
    new Level([
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent("^e$|[poe]e$|^e[epo]"), undefined, 0),
        ], "all eggplants must be adjacent to a tomato"),
        new OccurrenceRule(new RegExpEvent("etp|pte|^..e..$|^e$|^.e.$"), 1, undefined,
            "must contain a tomato next to a pepper and eggplant, unless there exist an eggplant in the middle"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent("^t|t$"), undefined, 0),
            new OccurrenceRule(new RegExpEvent("^e|e$"), undefined, 0),
        ], "tomatoes and eggplants must not be placed on the edge"),
        new OccurrenceRule(new RegExpEvent("o"), undefined, 0,
            "onions are forbidden"),
    ], 1, 5),
    // Uvodni pro dva spizy, vysvetluje, ze staci splneni na alespon jednom
    new Level([
        new OccurrenceRule(new RegExpEvent("o"), 2, undefined,
            "must have at least two onions"),
        new OccurrenceRule(new RegExpEvent("o"), 1, 1,
            "must have exactly one onion"),
        new OccurrenceRule(new RegExpEvent("tp"), 1, undefined,
            "must contain a tomato followed by pepper"),
    ], 2),
    // Prvni vygenerovana uloha
    new Level([
        new OccurrenceRule(new RegExpEvent('o'), 2, undefined, "at least two onions"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('.t.'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('^t|t$'), 1, undefined)
        ], "must contain a tomato at the edge and a tomato not at the edge"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('.o.'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('^o|o$'), 0, 0)
        ], "must contain an onion and onions must not be at the edge"),
        new OccurrenceRule(new UniqueIngredientsEvent(), 2, 2,
            "must contain exactly two kinds of ingredients"),
        new OccurrenceRule(new RegExpEvent('.'), 0, 2,
            "must be at most two items"),
    ], 2, 4),
    // Prvni rucne udelana uloha
    new Level([
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('....'), undefined, 0),
            new OccurrenceRule(new RegExpEvent('p'), 1, 1),
        ], "must be at most three items, exactly one pepper"),
        new OccurrenceRule(new RegExpEvent('e'), 0, 1, "at most 1 e"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('p'), 2, undefined),
            new OccurrenceRule(
                new RegExpEvent('.p.'), 1, undefined,
                "must have at least one pepper which is not at the edge"
            ),
        ], "at least two peppers, from which at least one is not at the edge"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('(^|[^e])p($|[^e])'),
                undefined, 0, "p must be adjacent to >= 1 e"),
            new OccurrenceRule(new RegExpEvent('epe'), undefined, 0),
        ], "there must be exactly one eggplant next to each pepper"),
        new CompositeRule([
            new OccurrenceRule(new PalindromeEvent(), 1, undefined),
            new OccurrenceRule(new RegExpEvent('^.(..)*$'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('e'), 1, undefined),
        ], "must be a palindrome of an odd length containing an eggplant"),
    ], 2, 5),
    // Sachova uloha 1
    new Level([
        new OccurrenceRule(new RegExpEvent('^p.*p$'), 1, 1,
            "must have a pepper on both edges"),
        new OccurrenceRule(new RegExpEvent('[^o]p[^o]'), 0, 0,
            "peppers must be adjacent to onions on both sides"),
        new OccurrenceRule(new RegExpEvent('^(tt|ee|pp|oo)*$'), 1, 1,
            "ingredients form pairs (each item must be adjacent to exactly one item of the same ingredient)"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('.'), 3, 3),
            new OccurrenceRule(new UniqueIngredientsEvent(), 3, 3),
        ], "must have exactly three items and their ingredients must all be different"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('(^|[^e])t($|[^e])'), undefined, 0),
            new OccurrenceRule(new RegExpEvent('ete'), undefined, 0),
        ], "each tomato must be adjacent to exactly one eggplant"),
    ], 2, 4),
    // Sachova uloha 2 (WIP)
    new Level([
        new OccurrenceRule(new RegExpEvent('pet'), 1, undefined,
            'must contain the sequence "pepper - eggplant - tomato"'),
        new OccurrenceRule(new RegExpEvent('^p|p$'), 1, undefined,
            'must have a pepper on at least one of the edges'),
        new OccurrenceRule(new RegExpEvent('op|po'), 1, undefined,
            "there must be a pepper which is adjacent to an onion"),
        new CompositeRule([
            new CompareOccurencesRule(
                new RegExpEvent('p'), new RegExpEvent('e'), (x, y) => { return x >= y },
            ),
            new CompareOccurencesRule(
                new RegExpEvent('p'), new RegExpEvent('t'), (x, y) => { return x < y },
            ),
        ], "there must be at least as many peppers as eggplants, but fewer peppers than tomatoes"),
        new OccurrenceRule(new RegExpEvent('t.t'), 1, undefined,
            "there must be an item surrounded with tomatoes from both sides"),
    ], 2, 4),
    // Sachova uloha 3 (WIP)
    // new Level([
    //     new OccurrenceRule(new RegExpEvent('^p.*p$'), 1, 1,
    //         "must have a pepper on both edges"),
    //     new OccurrenceRule(new RegExpEvent('[^o]p[^o]'), 0, 0,
    //         "peppers must be adjacent to onions on both sides"),
    //     new OccurrenceRule(new RegExpEvent('^(tt|ee|pp|oo)*$'), 1, 1,
    //         "ingredients form pairs (each item must be adjacent to exactly one item of the same ingredient)"),
    //     new CompositeRule([
    //         new OccurrenceRule(new RegExpEvent('.'), 3, 3),
    //         new OccurrenceRule(new UniqueIngredientsEvent(), 3, 3),
    //     ], "must have exactly three items and their ingredients must all be different"),
    //     new CompositeRule([
    //         new OccurrenceRule(new RegExpEvent('(^|[^e])t($|[^e])'), undefined, 0),
    //         new OccurrenceRule(new RegExpEvent('ete'), undefined, 0),
    //     ], "each tomato must be adjacent to exactly one eggplant"),
    // ], 2, 4),
    // Sachova uloha 4
    new Level([
        new OccurrenceRule(new RegExpEvent('^p$|^p[otp]|[otp]p$|[otp]p[otp]'), undefined, 0,
            "all peppers must be adjacent to an eggplant"),
        new OccurrenceRule(new RegExpEvent('^e|e$'), undefined, 0,
            "eggplants must not be on the edge"),
        new OccurrenceRule(new RegExpEvent('t'), undefined, 0,
            "tomatoes are not allowed"),
        new CompareOccurencesRule(
            new RegExpEvent('p'), new RegExpEvent('o'), (x, y) => { return x > y },
            "there are more peppers than onions"),
        new OccurrenceRule(new RegExpEvent('oo|tt|pp|ee'), undefined, 0,
            "no ingredient is adjacent to the one of the same type"),
    ], 1, 4),
    // Dummy uloha na konci (technicke duvody)
    new Level([], 0),
]
