import { Level } from "../rules/level"
import { RegExpEvent } from "../rules/regExpEvent"
import { OccurrenceRule } from "../rules/occurrenceRule"
import { CompositeRule } from "../rules/compositeRule"
import { PalindromeEvent } from "../rules/palindromeEvent"
import { UniqueIngredientsEvent } from "../rules/uniqueIngredientsEvent"


export let levels : Level[] = [
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
    // TODO cca 10-15 levelů, podle toho co zvládne Vašek
    new Level([
        new OccurrenceRule(new RegExpEvent('o'), 2, undefined, "at least two onions"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('.t.'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('^t|t$'), 1, undefined)
        ], "must contain a tomato at the edge and a tomato not at the edge"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('.o.'), 1, undefined),
            new OccurrenceRule(new RegExpEvent('^o|o$'), 0, 0)
        ], "must contain an onion which is not at the edge"),
        new OccurrenceRule(new UniqueIngredientsEvent(), 2, 2,
            "must contain exactly two kinds of ingredients"),
        new OccurrenceRule(new RegExpEvent('.'), 0, 2,
            "must be at most two items"),
    ], 2),
    new Level([
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('....'), undefined, 0),
            new OccurrenceRule(new RegExpEvent('p'), 1, 1),
        ], "at most 3 items, exactly one p"),
        new OccurrenceRule(new RegExpEvent('e'), 0, 1, "at most 1 e"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('p'), 2, undefined),
            new OccurrenceRule(
                new RegExpEvent('.p.'), 1, undefined,
                "at least one pepper not at the edge"
            ),
        ], "at least two peppers, from which at least one not at the edge"),
        new CompositeRule([
            new OccurrenceRule(new RegExpEvent('(^|[^e])p($|[^e])'),
                undefined, 0, "p must be adjacent to >= 1 e"),
            new OccurrenceRule(new RegExpEvent('epe'), undefined, 0),
        ], "there must be exactly one e next to each p"),
        new CompositeRule([
            new OccurrenceRule(new PalindromeEvent(), 1, undefined),
            new OccurrenceRule(new RegExpEvent('^.$|^...$'), 1, undefined),
        ], "palindrome of an odd length"),
    ], 2),
    new Level([
        new OccurrenceRule(new RegExpEvent("t"), 2, undefined,
            "must have at least two tomatoes"),
        new OccurrenceRule(new RegExpEvent("tt"), undefined, 0,
            "must not have two consecutive tomatoes"),
    ], 1),
    new Level([], 0),
]
